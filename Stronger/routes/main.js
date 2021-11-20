var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var flash = require('connect-flash');

var monk = require('monk');

/* GET main home page. */
router.get('/', function(req, res, next) {
  res.render('main', { user : req.user, message: req.flash()  });
});


/* GET log-in page. */
router.get('/login', function(req, res, next) {

  res.render('log-in', { user : req.user, message: req.flash() });
});


/* POST log-in */
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true,
                                   successFlash: 'Welcome!'})
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


/* GET sign-up page. */
router.get('/signup', function(req, res, next) {
  res.render('sign-up', { user : req.user, message: req.flash()  });
});

/* POST signup */
router.post('/signup', function(req, res) {
  Account.register(new Account({ 
    username : req.body.username,
    first_name: req.body.fname,
    last_name: req.body.lname,
    date_of_birth: req.body.dob,
    billing_address: "",
    shipping_address: ""
  }), req.body.password, function(err, account) {
      if (err) {
          return res.render('sign-up', { account : account });
      }

      passport.authenticate('local', {successFlash: 'Welcome!'})(req, res, function () {
        res.redirect('/');
      });
  });
});


/* GET equipment page. */
router.get('/equipment', function(req, res, next) {
  res.render('equipment-page', { user : req.user, message: req.flash()  });
});

/* GET equipment page. */
router.get('/equipment/:id', function(req, res, next) {
  res.render('equipment-page', { user : req.user, message: req.flash(), id : req.params.id });
});

/* GET user-history page. */
router.get('/user-history', function(req, res, next) {
  res.render('user-history', { user : req.user, message: req.flash()  });
});


/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { user : req.user, message: req.flash()  });
});

module.exports = router;
