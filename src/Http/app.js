const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const configureContainer = require('../Config/container'); // tvoj DI container
const apiV1Routes = require('../../routes/api/v1');

const app = express();

// --- view engine ispisan za REST API mozes da izostavis ---
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

configureContainer(app);

app.use('/api/v1', apiV1Routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// API-style error handler (vraća JSON)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
