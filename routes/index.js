let express = require('express');
let router = express.Router();
let currentDate = new Date();
currentDate = currentDate.toLocaleString();

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
