var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
	userID: String,
	datasetID: String,
},{
	collection: "favorite",
	timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} 
});

module.exports = mongoose.model('favorite', FavoriteSchema);