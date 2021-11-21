var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var flash = require('connect-flash');

/* GET log-in page. */
router.get('/login', function(req, res, next) {
  res.render('log-in', { user : req.user, message: req.flash() });
});


/* POST log-in */
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/customers/login',
                                   failureFlash: true,
                                   successFlash: 'Welcome!'})
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


/* GET sign-up page. */
router.get('/signup', function(req, res, next) {
  res.render('sign-up', { user : req.user });
});

/* POST signup */
router.post('/signup', function(req, res) {
  var first_name = req.body.fname;
  var last_name = req.body.lname;
  var username = req.body.username;
  var password = req.body.password;
  var confirm_password = req.body.confirmpwd;
  var dob = req.body.dob;

  if(password != confirm_password){
    res.render('sign-up', { user:req.user, Errormessage:"Password doen not match."});
  }
  else{
    Account.register(new Account({ 
      username : req.body.username,
      first_name: req.body.fname,
      last_name: req.body.lname,
      date_of_birth: req.body.dob,
      billing_address: "",
      shipping_address: ""
    }), req.body.password, function(err, account) {
        if (err) {
            return res.render('sign-up', {Errormessage : account });
        }

        passport.authenticate('local', {successFlash: 'Welcome!'})(req, res, function () {
          res.render('complete', {user: req.user, message: req.flash()});
        });
    });
  }
});

module.exports = router;