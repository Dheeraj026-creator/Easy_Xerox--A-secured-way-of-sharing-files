const Link = require('../models/link.js');

function generateUniqueName() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueName = '';
  for (let i = 0; i < 10; i++) {
      uniqueName += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uniqueName;
}

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 12; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

exports.getLinkPage = async (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');

  try {
      let userLink = await Link.findOne({ owner: req.user._id });

      if (!userLink) {
          const uniqueName = generateUniqueName();
          const password = generateRandomPassword();
          const generatedLink = `${baseUrl}/with/${uniqueName}`;

          userLink = new Link({ uniqueName, password, owner: req.user._id });
          await userLink.save();

          res.render('generate-link.ejs', { generatedLink, password, user: req.user });
      } else {
          const generatedLink = `${baseUrl}/with/${userLink.uniqueName}`;
          res.render('generate-link.ejs', { generatedLink, password: userLink.password, user: req.user });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
};

exports.regenerateLink = async (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');

  try {
      const uniqueName = generateUniqueName();
      const password = generateRandomPassword();
      const generatedLink = `${baseUrl}/with/${uniqueName}`;

      let userLink = await Link.findOne({ owner: req.user._id });
      if (userLink) {
          userLink.uniqueName = uniqueName;
          userLink.password = password;
          userLink.createdAt = Date.now();
      } else {
          userLink = new Link({ uniqueName, password, owner: req.user._id });
      }

      await userLink.save();
      res.render('generate-link.ejs', { generatedLink, password, user: req.user });
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
};
