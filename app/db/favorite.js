var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
	userID: String,
	datasetID: String,
},{
	collection: "favorites",
	timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} 
});

module.exports = mongoose.model('favorites', FavoriteSchema);