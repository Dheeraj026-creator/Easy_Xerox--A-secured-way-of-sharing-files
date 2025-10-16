const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const fs = require('fs');
const cron = require('node-cron');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const Access = require('./models/Access');

const app = express();
const PORT = 5000;
if(process.env.NODE_ENV!="production")
{require('dotenv').config();}

// MongoDB Connection
mongoose.connect(process.env.DB_url)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// Cron job to delete Access entries daily
cron.schedule('0 0 * * *', async () => {
  try {
    await Access.deleteMany({});
    console.log('Deleted all Access entries at midnight');
  } catch (err) {
    console.error(err);
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

require('./config/passport')();



app.use(session({
  secret: 'dangerous',
  store: MongoStore.create({mongoUrl:process.env.DB_url})
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});

// Routes
app.use(authRoutes);
app.use(linkRoutes);
app.use(uploadRoutes);

app.get('/', (req, res) => res.render('index.ejs'));

// Fallback
app.use((req, res) => res.status(404).send('Route not found!'));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app; // Export app for multer in controllers
