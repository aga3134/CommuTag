var mongoose = require('mongoose');

var ApiKeySchema = new mongoose.Schema({
	key: String,
	desc: String,
},{
	collection: "apiKey",
});

module.exports = mongoose.model('apiKey', ApiKeySchema);