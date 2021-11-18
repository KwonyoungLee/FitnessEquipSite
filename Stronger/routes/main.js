var express = require('express');
var router = express.Router();

var monk = require('monk');

/* GET main home page. */
router.get('/', function(req, res, next) {
  res.render('main', { user : req.user });
});


/* GET log-in page. */
router.get('/login', function(req, res, next) {
  res.render('log-in', { user : req.user });
});

/* GET sign-up page. */
router.get('/signup', function(req, res, next) {
  res.render('sign-up', { user : req.user });
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
