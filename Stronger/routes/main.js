var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

var monk = require('monk');

/* GET main home page. */
router.get('/', function(req, res, next) {
  res.render('main', { user : req.user });
});


/* GET log-in page. */
router.get('/login', function(req, res, next) {
  res.render('log-in', { user : req.user });
});


/* POST log-in */
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});


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

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
  });
});


/* GET equipment page. */
router.get('/equipment', function(req, res, next) {
  res.render('equipment-page', { user : req.user });
});


/* GET user-history page. */
router.get('/user-history', function(req, res, next) {
  res.render('user-history', { user : req.user });
});


/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { user : req.user });
});

module.exports = router;
