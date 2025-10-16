const User = require('../models/User');

exports.registerPage = (req, res) => res.render('register.ejs');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password) {
      req.flash('error_msg', 'Please fill in all fields');
      return res.redirect('/register');
  }

  try {
      const user = new User({ username, email });
      await User.register(user, password);

      req.login(user, err => {
          if (err) {
              req.flash('error_msg', 'Something went wrong during login');
              return res.redirect('/login');
          }
          req.flash('success_msg', 'You are now registered and logged in');
          return res.redirect('/generate-link-page');
      });
  } catch (err) {
      req.flash('error_msg', err.message);
      res.redirect('/register');
  }
};

exports.loginPage = (req, res) => res.render('login.ejs');

exports.logoutUser = (req, res) => {
  req.logout(() => {
      req.flash('success_msg', 'You are logged out');
      res.redirect('/login');
  });
};
