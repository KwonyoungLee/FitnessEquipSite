var express = require('express');
var router = express.Router();
var flash = require('connect-flash');

var monk = require('monk');

/* GET main home page. */
router.get('/', function(req, res, next) {
  res.render('main', { user : req.user, message: req.flash() });
});


/* GET equipment page. */
router.get('/equipment', function(req, res, next) {
  res.render('equipment-page', { user : req.user});
});

/* GET equipment page. */
router.get('/equipment/:id', function(req, res, next) {
  res.render('equipment-page', { user : req.user, id : req.params.id });
});

/* GET user-history page. */
router.get('/user-history', function(req, res, next) {
  res.render('user-history', { user : req.user});
});


/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { user : req.user});
});

/* GET confirmation page. */
router.get('/confirmation', function(req, res, next) {
  res.render('confirmation', { user : req.user});
});

/* GET order page. */
router.get('/orderitems', function(req, res, next) {
  res.render('orderitems', { user : req.user});
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { user : req.user});
});

/* GET about-us page. */
router.get('/about-us', function(req, res, next) {
  res.render('about-us', { user : req.user});
});
module.exports = router;
