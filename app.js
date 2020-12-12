var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/testapi');
const mongoose  = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test',testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
var url = "mongodb+srv://anirudh:angel%4012345@cluster0.u1vja.mongodb.net/test?authSource=admin&replicaSet=atlas-q0xuph-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose.connect(url, {
  useNewUrlParser : true,
 useUnifiedTopology : true,
 useFindAndModify: false,
 useCreateIndex: true,
});

mongoose.connection
  .once("open", () => console.log("DB Connected"))
  .on("error", (error) => {
    console.log("Error While Connecting With DB");
  });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
