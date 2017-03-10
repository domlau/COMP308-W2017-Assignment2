let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create user object that represents the document in assignment collection
let user = require('../config/user');

/* GET user page. */
router.get('/login', (req, res, next) => {
  //get all the users in the user collection
  user.find((err, db) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/login', {
        title: 'Login',
        user: user
      });
    }
  });
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    
    title: 'Dominic Portfolio Site',
  });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('content/about', { 
    title: 'About Me' 
  });
});

/* GET projects page */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', { 
    title: 'My Projects' 
  });
});

/* GET services page */
router.get('/services', (req, res, next) => {
  res.render('content/services', { 
    title: 'My Services' 
  });
});

/* GET contact page */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', { 
    title: 'Contact Me' 
  });
});
module.exports = router;
