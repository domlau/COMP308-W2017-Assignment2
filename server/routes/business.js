let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//game obj created from schema/model
let user = require('../models/users');

/* GET user login page. */
router.get('/', (req, res, next) => {
  //get all the users in the user collection
  user.find((err, db) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('business/index', {
        title: 'Login',
        users: user
      });
    }
  });
});

module.exports = router;