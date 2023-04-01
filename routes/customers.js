var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var flash = require('connect-flash');
var monk = require('monk');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true}));


//mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@stronger.bxwmgqx.mongodb.net/


var ADDRESS = '127.0.0.1:27017/Stronger'
var db = monk(ADDRESS)
var collection = db.get('CustomerInformation');

var shoppingCartCollection = db.get('ShoppingCart')

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
  var dob = req.body.dob;

  Account.register(new Account({ 
    username : username,
    first_name: first_name,
    last_name: last_name,
    date_of_birth: dob,
    billing_address: "",
    shipping_address: ""
  }), req.body.password, function(err, account) {
    if (err) {
      return res.render('sign-up', {Errormessage : account });
    }else{
      shoppingCartCollection.insert(
      {
        customer_username : username,
        items : ""
      },function(err,shoppingcart){
        if (err) throw err;
        passport.authenticate('local', {successFlash: 'Welcome!'})(req, res, function () {
          res.render('complete', {user: req.user, message: req.flash()});
        })
      });
    }
  });
});

router.get('/:username', function(req, res, next){
  collection.findOne({ username : req.params.username}, function(err,obj){
    if (err) throw err;
    res.json(obj);
  });

});


router.post('/:id/update',function(req, res, next){
  collection.update({ _id: req.params.id},
  {
    $set: {
      billing_address : req.body.billing_address,
      shipping_address : req.body.shipping_address
    }
  }
  ,function(err,user){
    if (err) throw err;
    res.json(user)
  })
})

module.exports = router;