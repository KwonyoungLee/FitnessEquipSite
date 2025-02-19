var express = require('express');
var router = express.Router();
var monk = require('monk');

var methodOverride = require('method-override')
router.use(methodOverride('_method'));
var lodash = require("lodash");

//var ADDRESS = 'mongodb+srv://lkyoung95:ai908Thlwcv6QBVH@stronger.bxwmgqx.mongodb.net/?retryWrites=true&w=majority'
//var db = monk(ADDRESS)

var dotenv = require('dotenv');
dotenv.config()
//var ADDRESS = 'mongodb+srv://lkyoung95:ai908Thlwcv6QBVH@stronger.bxwmgqx.mongodb.net/Stronger'
var ADDRESS =`${process.env.MONK_URI}`
var db = monk(ADDRESS)
var collection = db.get('Equipment');

router.get('/', function(req, res, next) {
  var pagelimit = 8;
  var page = req
  collection.find({"deleted" : "0"},{sort: {'item_name': -1}},function(err,equipment){
    if (err) throw err;
    res.json(equipment);
  })
});

router.get('/count',function(req,res,next){
  collection.count({ deleted: "0"},function(err,count){
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

router.get('/search/:search_string',function(req,res,next){
  var itemSearchString = new RegExp(req.params.search_string);
  collection.find({item_name : itemSearchString, deleted: "0"},function(err,equipment){
    res.json(equipment)
  })
})

router.get('/category/:category_name',function(req,res,next){
  collection.find({ category : req.params.category_name, deleted: "0"}, function(err,equipment){
    res.json(equipment)
  })
})

router.get('/filter/search/:search_string/:category_name',function(req,res,next){
  var itemSearchString = new RegExp(req.params.search_string);
  collection.find({item_name : itemSearchString, category : req.params.category_name, deleted: "0"},function(err,equipment){
    res.json(equipment)
  })
})

router.get('/page/:pagenumber', function(req, res, next) {
  var pagelimit = 8;
  var page = req.params.pagenumber;
  collection.find({deleted : "0"},{limit : pagelimit, skip : ((pagelimit * page) - pagelimit) },function(err,equipment){
    if (err) throw err;
    res.json(equipment);
  })
});

router.get('/:id', function(req, res, next) {
  collection.findOne({_id : req.params.id},function(err,equipment){
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
  collection.update({item_name: req.params.item_name},
    {
      $set: {quantity_in_stock : req.body.quantity_in_stock}}
    , function(err, equipment){
      if(err) throw err;
      res.json(equipment)
    })
});


module.exports = router;
