var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');


//user authentication
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var mainRouter = require('./routes/main');
var customersRouter = require('./routes/customers');
var equipmentRouter = require('./routes/equipment');
var ordersRouter = require('./routes/orders');
var shoppingCart = require('./routes/shoppingcart')

var app = express();

// mongoose
mongoose.connect('mongodb://127.0.0.1:27017/Stronger');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//user authentication
app.use(session({ 
  secret: 'this-is-a-secret-token',
  resave: true,
  saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', mainRouter);
app.use('/customers',customersRouter)
app.use('/api/equipment',equipmentRouter)
app.use('/orders',ordersRouter)
app.use('/api/shoppingcart',shoppingCart)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

