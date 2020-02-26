var mongoose = require('mongoose');

var ApiKeySchema = new mongoose.Schema({
	key: String,
	desc: String,
},{
	collection: "apiKeys",
});

module.exports = mongoose.model('apiKeys', ApiKeySchema);