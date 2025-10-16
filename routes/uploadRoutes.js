const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../config/multer');

router.get('/with/:randomCode', uploadController.enterNamePage);
router.post('/saveName', uploadController.saveName);
router.get('/with/:randomCode/:name', uploadController.uploadPage);

router.get('/files/:randomCode/:name', uploadController.listFiles);
router.post('/upload/:randomCode/:name', upload.array('file', 5), (req, res) => res.json(req.files.map(f => f.filename)));

router.get('/download/:code/:name/:fileName', uploadController.downloadFile);
router.delete('/delete/:randomCode/:name/:filename', uploadController.deleteFile);
router.delete('/deleteAll/:randomCode/:name', uploadController.deleteAllFiles);

module.exports = router;
