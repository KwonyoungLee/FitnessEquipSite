var express = require('express');
var router = express.Router();
var monk = require('monk');

var methodOverride = require('method-override')
router.use(methodOverride('_method'));
var lodash = require("lodash");

var db = monk('127.0.0.1:27017/Stronger')
var collection = db.get('ShoppingCart');

router.get('/', function(req, res, next) {
  collection.find({},function(err,shoppingcart){
    if (err) throw err;
    res.json(shoppingcart);
  });
});

router.get('/:username', function(req, res, next) {
  collection.findOne({customer_username : req.params.username },function(err,shoppingcart){
    if (err) throw err;
    res.json(shoppingcart);
  });
});

router.post('/create',function(req,res,next){
  collection.insert(
  {
    customer_username : req.body.username,
    items : ""
  },function(err,shoppingcart){
    if (err) throw err;
    res.json(shoppingcart)
  })
})

router.post('/update/:username',function(req,res,next){
  collection.findOne({customer_username: req.params.username},function(err,current_shoppingcart){
    if (err) throw err;

    item_to_add = {
      item_name : req.body.data.item_name,
      item_price : req.body.data.item_price,
      item_quantity : req.body.data.item_quantity,
      item_image : req.body.data.item_image
    }

    if (current_shoppingcart.items == "")
    {
      current_shoppingcart.items = [item_to_add]
    }
    else
    {
      current_shoppingcart.items.push(item_to_add)
    }

    collection.update({_id: current_shoppingcart._id},{
      $set: {
        items : current_shoppingcart.items
      }
    },function(shoppingcart){
      res.json(shoppingcart);
    })
  })
})

router.delete('/remvove/:id',function(req,res,next){
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

/*
router.post('/:id/update',function(req,res,next){

  collection.findOne({_id : req.params.id },function(err,shoppingcart){
    if (err) throw err;

    collection.update({ _id: req.params.id},
    {
      $set: {
        req.body.item_name,
        req.body.item_price,
        req.body.quantity
      }
    }
    ,function(err,equipment){
      if (err) throw err;
      res.json(equipment)
    })
  })
})
*/


module.exports = router;
