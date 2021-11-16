var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.post('/signup', function(req, res) {
  Account.register(new Account({ 
    username : req.body.username,
    first_name: req.body.fname,
    last_name: req.body.lname,
    date_of_birth: req.body.dob
  }), req.body.password, function(err, account) {
      if (err) {
          return res.json({ "connection" : "fail" });
      }

      passport.authenticate('local')(req, res, function () {
        res.json({ "connection" : "success"});
      });
  });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({ "connection" : "success"});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json({ "connection": "logged out"})
});

module.exports = router;