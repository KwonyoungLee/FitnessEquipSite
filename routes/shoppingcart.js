var express = require('express');
var router = express.Router();
var monk = require('monk');

var methodOverride = require('method-override')
router.use(methodOverride('_method'));
var lodash = require("lodash");

//var ADDRESS = 'mongodb+srv://lkyoung95:ai908Thlwcv6QBVH@stronger.bxwmgqx.mongodb.net/?retryWrites=true&w=majority'
//var db = monk(ADDRESS)

var ADDRESS = 'mongodb+srv://lkyoung95:ai908Thlwcv6QBVH@stronger.bxwmgqx.mongodb.net/Stronger'
var db = monk(ADDRESS)
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
      item_name : req.body.item_name,
      item_price : req.body.item_price,
      item_quantity : req.body.item_quantity,
      item_image : req.body.item_image,
      item_qty_in_stock : req.body.item_qty_in_stock
    }
    if (current_shoppingcart.items == "")
    {
      current_shoppingcart.items = [item_to_add]
    }
    else
    {
      current_shoppingcart.items.push(item_to_add)
    }
    
    collection.findOneAndUpdate({customer_username: req.params.username},{
       $set: {
        items : current_shoppingcart.items
      }
    },function(shoppingcart){
      res.json(shoppingcart);
    })
  })
})

/* DELETE particular item FROM CART*/
router.delete('/:username/:item_name', function(req, res) {
  collection.findOneAndUpdate(
    {customer_username: req.params.username},
    { $pull: {items: {item_name: req.params.item_name}}}, {new: true}, function(err, items){
      if(err) throw err;
      res.json(items);
  });
});

/*UPDATE quantity for particular item in Cart*/
router.put('/:username/:item_name', function(req, res) {
  console.log(req.body)
  collection.update({
    'customer_username' : req.params.username, 'items.item_name' : req.params.item_name},
    { $set: {'items.$.item_quantity' : req.body.item_quantity}}, function(err, item){
      if(err) throw err;
      res.json(item);
  });
});

/* DELETE all items from cart */
router.delete('/:username', function(req, res) {
  collection.update(
    {customer_username: req.params.username},
    { $set: {'items': []}}, {new: true}, function(err, items){
      if(err) throw err;
      res.json(items);
  });
});


/*
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
