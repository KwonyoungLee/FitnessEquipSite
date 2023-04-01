var express = require('express');
var router = express.Router();
var flash = require('connect-flash');

var fileUpload = require('express-fileupload')
router.use(fileUpload());

var multer = require('multer')
var path = require('path');

var morgan = require('morgan');
router.use(morgan('dev'))

var monk = require('monk');

//var ADDRESS = 'mongodb+srv://lkyoung95:ai908Thlwcv6QBVH@stronger.bxwmgqx.mongodb.net/?retryWrites=true&w=majority'
//var db = monk(ADDRESS)

var ADDRESS = '127.0.0.1:27017/Stronger'
var db = monk(ADDRESS)
var collection = db.get('Equipment');

var cors = require('cors')
router.use(cors())

var methodOverride = require('method-override')
router.use(methodOverride('_method'))

const destination = path.join(__dirname,'./../public/images/Equipment/');

/* GET main home page. */
router.get('/', function(req, res, next) {
  res.render('main', { user : req.user, message: req.flash(), filter: "" });
});

router.get('/page/:category', function(req, res, next) {
  res.render('main', { user : req.user, message: req.flash(), filter: req.params.category });
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

/* GET list-all-items page */
router.get('/list-all-items', function(req, res, next) {
  res.render('list-all-items', { user : req.user});
});

/* GET add-item page */
router.get('/new', function(req, res, next) {
  res.render('add-item', { user : req.user});
})

/* add new equipment item */
router.post('/equipment/new', function(req, res, next) {

    var equipment_image_file = req.files.equipment_image_file;
    equipment_image_file.mv(path.join(destination,equipment_image_file.name), function(err) {
      if (err) throw err;
    });
    collection.insert({
        item_name: req.body.equipment_name,
        price: req.body.equipment_price,
        description: req.body.equipment_description,
        category: req.body.equipment_category,
        image: equipment_image_file.name,
        quantity_in_stock: req.body.equipment_quantity,
        deleted: "0"
    },function(err,equipment){
      if(err) throw err;
      res.redirect('/');
    })
});

/* GET update-item page */
router.get('/equipment/update/:id', function(req, res, next) {
  res.render('update-item', { user : req.user, id : req.params.id });
});


/* update equipment item */
router.post('/equipment/update/:id', function(req, res, next) {

  if(req.files){
    var equipment_image_file = req.files.equipment_image_file;
    equipment_image_file.mv(path.join(destination,equipment_image_file.name), function(err) {
      if (err) throw err;
    });
    collection.update({_id : req.params.id},{
      $set:{
        item_name: req.body.equipment_name,
        price: req.body.equipment_price,
        description: req.body.equipment_description,
        category: req.body.equipment_category,
        image: equipment_image_file.name,
        quantity_in_stock: req.body.equipment_quantity
      }
    },function(err,equipment){
      if(err) throw err;
      res.redirect('/equipment/' + req.params.id);
    })
  }else{
    collection.update({_id : req.params.id},{
      $set:{
        item_name: req.body.equipment_name,
        price: req.body.equipment_price,
        description: req.body.equipment_description,
        category: req.body.equipment_category,
        quantity_in_stock: req.body.equipment_quantity
      }
    },function(err,equipment){
      if(err) throw err;
      res.redirect('/equipment/' + req.params.id);
    })
  }
});

/* delete equipment item */
router.delete('/equipment/:id/delete',function(req,res,next){
  collection.update({ _id: req.params.id},
  {
    $set: {
      deleted : "1"
    }
  }
  ,function(err,equipment){
    if (err) throw err;
    res.redirect('/');
  })
})

module.exports = router;
