const path = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const serveFavicon = require('serve-favicon');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const passportConfigure = require('./passport-configuration.js');
const baseRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const cors = require('cors');
const app = express();

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    credentials: true,
    origin: [process.env.ALLOWED_CORS_ORIGINS] // <== this will be the URL of our React app (it will be running on port 3000)
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
      secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bindUserToViewLocals);

app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/api', require('./routes/business'));
app.use('/api', require('./routes/monument'));
app.use('/api', require('./routes/course'));
app.use('/api', require('./routes/guide'));
//app.use('/api', require('./routes/review'));

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});




module.exports = app;
