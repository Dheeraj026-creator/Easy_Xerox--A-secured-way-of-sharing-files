const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error_msg', 'Please log in to access this page');
  res.redirect('/login');
}

router.get('/generate-link-page', ensureAuthenticated, linkController.getLinkPage);
router.post('/regenerate-link', ensureAuthenticated, linkController.regenerateLink);

module.exports = router;
