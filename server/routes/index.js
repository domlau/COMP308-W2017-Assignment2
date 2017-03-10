let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create user object that represents the document in assignment collection
let user = require('../models/users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Dominic Portfolio Site',
    users:''
  });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('content/about', { 
    title: 'About Me',
    users:''
  });
});

/* GET projects page */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', { 
    title: 'My Projects',
    users:'' 
  });
});

/* GET services page */
router.get('/services', (req, res, next) => {
  res.render('content/services', { 
    title: 'My Services',
    users:'' 
  });
});

/* GET contact page */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', { 
    title: 'Contact Me',
    users:''
  });
});
module.exports = router;
