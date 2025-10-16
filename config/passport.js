const passport = require('passport');
const User = require('../models/User');

module.exports = function() {
    passport.use(User.createStrategy()); // Local strategy from plugin

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
