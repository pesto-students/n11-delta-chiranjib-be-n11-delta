const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require('passport');
const cors = require('cors');

const indexRouter = require('./routes/index');
const bookListRouter = require('./routes/bookList');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

mongoose.connect(
  process.env.MONGODB_URI
);
mongoose.connection.on('error', error => console.log(error) );

require('./core/auth');

// passport.authenticate('jwt', { session: false }),

app.use('/', indexRouter);
app.use('/books', bookListRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error response
  res.send(err.status || 500);
});

module.exports = app;
