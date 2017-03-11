let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//obj created from schema/model
let UserModel = require('../models/users');
let User = UserModel.User;
let contact = require('../models/contacts');

/*function to check for user auth */
function requireAuth(req,res,next) {
  //check for user logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET contact list page. READ */
router.get('/', requireAuth, (req, res, next) => {
  //get all the users in the user collection
  contact.find((err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('business/index', {
        title: 'Contacts',
        contacts: contacts,
        displayName: req.user ? req.user.displayName: ''
      });
    }
  });
});

/*GET contacts details to add new contact */
router.get('/add', requireAuth, (req,res,next) => {
  res.render('/business/details', {
    title:"Add a new Contact",
    contacts:'',
    displayName: req.user.displayName
  });
});

/*POST process game details to add new contact - CREATE */
router.post('/add', requireAuth, (req,res,next) => {
  let newContact = contact({
    "contactName": req.body.contactName,
    "contactNumber": req.body.contactNumber,
    "emailAddress": req.body.emailAddress
  });
  contact.create(newContact, (err,contact) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/business')
    }
  });
});

/* GET grab contact details to edit */
router.get('/:id', requireAuth, (req,res,next) => {
  try {
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    //find contact by id
    contact.findById(id, (err,contacts) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.render('/business/details', {
          title:"Contact Details",
          contacts:contacts,
          displayName: req.user.displayName
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/errors/404');
  }
});

/*POST process information to update document */
router.post('/:id', requireAuth, (req,res,next) => {
  let id = req.params.id;

  let updateContact = contact({
    "_id":id,
    "contactName": req.body.contactName,
    "contactNumber": req.body.contactNumber,
    "emailAddress": req.body.emailAddress
  });
  contact.update({_id:id},updateContact,(err) => {
    if(err){
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/business');
    }
  });
});

/* GET Process to delete contact id */
router.get('/delete/:id',requireAuth,(req,res,next) => {
  let id = req.params.id;

  contact.remove({_id:id}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    }else {
      res.redirect('/business');
    }
  });
});

module.exports = router;
