let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define the user models
let UserModel = require('../models/users');
let User = UserModel.User;

//define the contact model
let contact = require('../models/contacts');

//function to check for user authentication
function requireAuth(req,res,next) {
  //check for user logged
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Dominic Portfolio Site',
    contacts:'',
    displayName: req.user ? req.user.displayName: ''
  });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('content/about', { 
    title: 'About Me',
    contacts:'',
    displayName: req.user ? req.user.displayName: ''
  });
});

/* GET projects page */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', { 
    title: 'My Projects',
    contacts:'',
    displayName: req.user ? req.user.displayName: '' 
  });
});

/* GET services page */
router.get('/services', (req, res, next) => {
  res.render('content/services', { 
    title: 'My Services',
    contacts:'',
    displayName: req.user ? req.user.displayName: '' 
  });
});

/* GET contact page */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', { 
    title: 'Contact Me',
    contacts:'',
    displayName: req.user ? req.user.displayName: ''
  });
});

/*GET /login - rendering login view */
router.get('/login', (req,res,next) => {
  //check if user is logged in
  if(!req.user){
    //render login page
    res.render('auth/login', {
      title: "Login",
      contacts:'',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName: ''
    });
    return;
  } else {
    return res.redirect('/business');
  }
});

/*POST /login - process the login authentication */
router.post('/login',passport.authenticate('local',{
  successRedirect:'/business',
  failureRedirect:'/login',
  failureFlash:'bad login'
}));

/*GET /register - render registration view */
router.get('/register', (req,res,next) => {
  //check if user is registered/logged in
  if(!req.user) {
    //rengder registration page
    res.render('auth/register', {
      title: 'Register',
      contacts:'',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    });
    return;
  } else {
    return res.redirect('/business');
  }
});

/*POST /register - process the registration */
router.post('/register', (req,res,next) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log('Error inserting new user');
        if(err.name == 'UserExistsError') {
          req.flash('registerMessage','Registration Error: User already exists');
        }
        return res.render('auth/register',{
          title: 'Register',
          contacts: '',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      //when successful registered
      return passport.authenticate('local')(req,res,() =>{
        res.redirect('/business');
      });
    });
});

/*GET Logout */
router.get('/logout', (req,res,next) => {
  req.logout();
  //redirect back to homepage
  res.redirect('/');
});

module.exports = router;
