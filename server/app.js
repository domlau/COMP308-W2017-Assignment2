//Middleware (internal and external)
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let LocalStrategy = passportlocal.Strategy;
let flash = require('connect-flash');

//add mongoose module
let mongoose = require('mongoose');

//establish URI
let config = require('./config/db');

mongoose.connect(process.env.URI || config.URI);
let db = mongoose.connection;
//establish connection to mongo db and use assignment 2 database
db.on('error',console.error.bind(console,'connection error'));
db.once('open',() => {
  console.log("Connected to Mongodb");
});


//defining the page routers
let index = require('./routes/index');
//routes for business
let business = require('./routes/business');



let app = express();

// view engine setup
//finding the view folder to mash up with path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

//setup session
app.use(session({
  secret:"Secret",
  saveUninitialized: true,
  resave:true
}));

//initialize passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Wildcard; this will go to index page
app.use('/', index);
app.use('/business',business);

//setting up passport configuration
let UserModel = require('./models/users');
let User = UserModel.User;
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
