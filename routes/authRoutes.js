const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/register', authController.registerPage);
router.post('/register', authController.registerUser);

router.get('/login', authController.loginPage);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/generate-link-page',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', authController.logoutUser);

module.exports = router;
