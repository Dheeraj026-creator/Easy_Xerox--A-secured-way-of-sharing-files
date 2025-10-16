const path = require('path');
const fs = require('fs');
const multer = require('../app').upload;
const Link = require('../models/link');
const Access = require('../models/Access');

exports.enterNamePage = async (req, res) => {
  const { randomCode } = req.params;
  const link = await Link.findOne({ uniqueName: randomCode });

  if (!link) return res.status(404).send('The link is invalid or has expired.');
  res.render('enterName', { randomCode });
};

exports.saveName = async (req, res) => {
  const { name, randomCode } = req.body;

  const link = await Link.findOne({ uniqueName: randomCode });
  if (!link) return res.status(404).send('Invalid randomCode or link not found.');

  if (link.password === name) {
      const accessEntry = await Access.findOne({ randomCode });
      return res.render('adminPage', { randomCode, names: accessEntry ? accessEntry.names : [] });
  }

  let accessEntry = await Access.findOne({ randomCode });
  if (!accessEntry) {
      accessEntry = new Access({ randomCode, names: [name] });
  } else {
      accessEntry.names.push(name);
  }
  await accessEntry.save();

  res.redirect(`/with/${encodeURIComponent(randomCode)}/${encodeURIComponent(name)}`);
};

exports.uploadPage = async (req, res) => {
  const { randomCode, name } = req.params;
  res.render('uploadPage', { randomCode, name });
};

exports.listFiles = (req, res) => {
  const { randomCode, name } = req.params;
  const uploadDir = path.join(__dirname, '../uploads', randomCode, name);

  fs.readdir(uploadDir, (err, files) => {
      if (err) return res.status(500).json({ error: 'Failed to list files' });
      res.json(files);
  });
};

exports.downloadFile = (req, res) => {
  const { code, name, fileName } = req.params;
  const filePath = path.join(__dirname, '../uploads', code, name, fileName);

  if (fs.existsSync(filePath)) {
      res.download(filePath, err => {
          if (err) res.status(500).send('Error downloading file');
      });
  } else {
      res.status(404).send('File not found');
  }
};

exports.deleteFile = (req, res) => {
  const { randomCode, name, filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', randomCode, name, filename);

  if (fs.existsSync(filePath)) {
      fs.unlink(filePath, err => {
          if (err) return res.status(500).json({ message: 'Error deleting file', error: err });
          return res.status(200).json({ message: 'File deleted successfully' });
      });
  } else {
      return res.status(404).json({ message: 'File not found' });
  }
};

exports.deleteAllFiles = (req, res) => {
  const { randomCode, name } = req.params;
  const folderPath = path.join(__dirname, '../uploads', randomCode, name);

  if (!fs.existsSync(folderPath)) return res.status(404).json({ error: 'Folder not found' });

  fs.readdir(folderPath, (err, files) => {
      if (err) return res.status(500).json({ error: 'Failed to read folder' });

      files.forEach(file => fs.unlinkSync(path.join(folderPath, file)));
      return res.status(200).json({ message: 'All files deleted successfully' });
  });
};
