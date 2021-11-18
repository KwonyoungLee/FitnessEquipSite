var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username : String,
	first_name: String,
	last_name: String,   
	date_of_birth: Date,
	billing_address: String,
	shipping_address: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account, 'CustomerInformation');
