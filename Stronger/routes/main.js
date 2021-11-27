var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var fileUpload = require('express-fileupload')
//var cors = require('cors')
//var morgan = require('morgan');
//var lodash = require('lodash');

var monk = require('monk');
var db = monk('127.0.0.1:27017/Stronger')
var collection = db.get('Equipment');

//var methodOverride = require('method-override')

//router.use(methodOverride('_method'))
//var bodyParser = require('body-parser');
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended : true}));

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
router.get('/contact-us', function(req, res, next) {
  res.render('contact-us', { user : req.user});
});

/* GET about-us page. */
router.get('/about-us', function(req, res, next) {
  res.render('about-us', { user : req.user});
});

router.get('/list-all-items', function(req, res, next) {
  res.render('list-all-items', { user : req.user});
});

router.get('/equipment/update/:id', function(req, res, next) {
  res.render('update-item', { user : req.user, id : req.params.id });
});

router.post('/equipment/update/:id', function(req, res, next) {

  collection.update({_id : req.params.id},{
    $set:{
      item_name: req.body.equipment_name,
      price: req.body.equipment_price,
      description: req.body.equipment_description,
      category: req.body.equipment_category,
      image: req.body.equipment_image,
      quantity_in_stock: req.body.equipment_quantity,
    }
    },function(err,equipment){
      if(err) throw err;
      res.redirect('/equipment/' + req.params.id)
    })
});


module.exports = router;
