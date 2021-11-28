var express = require('express');
var router = express.Router();
var monk = require('monk');

var methodOverride = require('method-override')
router.use(methodOverride('_method'));
var lodash = require("lodash");

var db = monk('127.0.0.1:27017/Stronger')
var collection = db.get('Equipment');

router.get('/', function(req, res, next) {
  var pagelimit = 8;
  var page = req
  collection.find({},function(err,equipment){
    if (err) throw err;
    res.json(equipment);
  })
});

router.get('/count',function(req,res,next){
  collection.count({},function(err,count){
    if (err) throw err;
    res.json(count)
  })
})

router.get('/categories',function(req,res,next){
  collection.distinct("category",function(err,categories){
    if (err) throw err;
    res.json(categories);
  })
})

router.get('/page/:pagenumber', function(req, res, next) {
  var pagelimit = 8;
  var page = req.params.pagenumber;
  collection.find({},{limit : pagelimit, skip : ((pagelimit * page) - pagelimit) },function(err,equipment){
    if (err) throw err;
    res.json(equipment);
  })
});

router.get('/:id', function(req, res, next) {
  collection.findOne({_id : req.params.id },function(err,equipment){
    if (err) throw err;
    res.json(equipment);
  })
});

router.post('/',function(req,res,next){
collection.insert(
  {
    item_name : req.body.item_name,
    price : req.body.price,
    description : req.body.description,
    category : req.body.category,
    image : req.body.image,
    quantity_in_stock : req.body.quantity_in_stock,
    deleted: "0"
  },function(err,equipment){
    if (err) throw err;
    res.json(equipment)
  })
})

router.delete('/:id',function(req,res,next){
  collection.update({ _id: req.params.id},
  {
    $set: {
      deleted : "1"
    }
  }
  ,function(err,equipment){
    if (err) throw err;
    res.json(equipment);
  })
})

router.post('/:id/update',function(req,res,next){
  collection.update({ _id: req.params.id},
  {
    $set: {
      item_name : req.body.item_name,
      price : req.body.price,
      description : req.body.description,
      category : req.body.category,
      image : req.body.image,
      quantity_in_stock : req.body.quantity_in_stock,
      deleted : "0"
    }
  }
  ,function(err,equipment){
    if (err) throw err;
    res.json(equipment)
  })
})

/* UPDATE PARTICULAR EQUIPMENT QUANTITY*/
router.post('/:item_name', function(req,res){
  console.log("in post route")
  console.log("req" + req.body.quantity_in_stock);
  collection.update({item_name: req.params.item_name},
    {
      $set: {quantity_in_stock : req.body.quantity_in_stock}}
    , function(err, equipment){
      if(err) throw err;
      res.json(equipment)
    })
});


module.exports = router;
