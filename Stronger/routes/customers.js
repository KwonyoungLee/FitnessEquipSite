var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var flash = require('connect-flash');
var monk = require('monk');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true}));



var db = monk('127.0.0.1:27017/Stronger')
var collection = db.get('CustomerInformation');

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
  var dob = req.body.date_of_birth;

  console.log(first_name);
    Account.register(new Account({ 
      username : username,
      first_name: first_name,
      last_name: last_name,
      date_of_birth: dob,
      billing_address: "",
      shipping_address: ""
    }), req.body.password, function(err, account) {
        if (err) {
            console.log(err.message);
            return res.render('sign-up', {Errormessage : account });
        }
          console.log("attempting");
        passport.authenticate('local', {successFlash: 'Welcome!'})(req, res, function () {
          console.log("complete");
          res.render('complete', {user: req.user, message: req.flash()});
        });
    });
});

router.get('/check', function(req, res, next){
  collection.findOne({ username : req.body.username}, function(err,obj){
    if (err) throw err;
    res.json(obj);
  });

});

module.exports = router;