var express = require('express');
var router = express.Router();
var monk = require('monk');

//get db object

//var ADDRESS = 'mongodb+srv://lkyoung95:ai908Thlwcv6QBVH@stronger.bxwmgqx.mongodb.net/?retryWrites=true&w=majority'
//var db = monk(ADDRESS)

var dotenv = require('dotenv');
dotenv.config()
//var ADDRESS = 'mongodb+srv://lkyoung95:ai908Thlwcv6QBVH@stronger.bxwmgqx.mongodb.net/Stronger'
var ADDRESS =`${process.env.MONK_URI}`
var db = monk(ADDRESS)
var collection = db.get('Orders');



// get orders by customer id if not empty
// query by /orders?customerid=value
// else
// get all orders
router.get('/', function(req, res) {
    if(req.query.customerid !== undefined){
        collection.find({customer_id: req.query.customerid}, function(err, orders){
            if(err) throw err;
            res.json(orders);
        });
    }
    else {
        collection.find({}, function(err, orders){
            if(err) throw err;
            res.json(orders);
        });
    }
});

// get a specific order
// /orders/id
router.get('/:id', function(req, res) {
    collection.findOne({_id: req.params.id}, function(err, order){
      if(err) throw err;
      res.json(order);
    });
  });

  //insert a new order
  router.post('/', function(req, res) {
    collection.insert({
      customer_id: req.body.customer_id,
      customer_username: req.body.customer_username,
      order: req.body.order, 
      total_price: req.body.total_price,
      date: req.body.date
    }, function(err, order){
      if(err) throw err;
      //if insert is successful, return new order object
      res.json(order);
    });
  });
  
  module.exports = router;