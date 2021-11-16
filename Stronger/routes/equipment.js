var express = require('express');
var router = express.Router();
var monk = require('monk');

var methodOverride = require('method-override')
router.use(methodOverride('_method'));

var db = monk('127.0.0.1:27017/Stronger')
var collection = db.get('Equipment');

router.get('/', function(req, res, next) {
  collection.find({},function(err,equipment){
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
  },function(err,video){
    if (err) throw err;
    //if insert is succcessful, callback function will return the new video object
    res.json(video)
  })
})

router.delete('/:id',function(req,res,next){
  collection.update({ _id: req.params.id},
  {
    $set: {
      deleted : "1"
    }
  }
  ,function(err,video){
    if (err) throw err;
    //if insert is succcessful, callback function will return the new video object
    res.json(video);
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
  ,function(err,video){
    if (err) throw err;
    //if insert is succcessful, callback function will return the new video object
    res.json(video)
  })
})


module.exports = router;
