var mongoose = require('mongoose');

var ApiKeySchema = new mongoose.Schema({
	key: String,
	desc: String,
	scope: String,
	dataset: [String]
},{
	collection: "apiKey",
});

module.exports = mongoose.model('apiKey', ApiKeySchema);