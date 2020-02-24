var mongoose = require('mongoose');

var DatasetSchema = new mongoose.Schema({
	name: String,
	maxWidth: {
		type: Number,
		min: 32,
		max: 1920,
		default: 640
	},
	maxHeight: {
		type: Number,
		min: 32,
		max: 1920,
		default: 480
	},
	isPublic: {
		type: Boolean,
		default: true
	},
	enableUpload: {
		type: Boolean,
		default: true
	},
	enableDownload: {
		type: Boolean,
		default: true
	},
	enableGPS: {
		type: Boolean,
		default: false
	},
	enableAnnotation: {
		type: Boolean,
		default: true
	},
	annotationType: {
		type: String,
		default: "bbox"
	},
	tagArr: [String],
	picCover: String,
	picNum: {
		type: Number,
		default: 0
	},
	tagNum: {
		type: Number,
		default: 0
	},
	member:[mongoose.Schema.Types.Mixed]
},{
	collection: "datasets",
	timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} 
});

module.exports = mongoose.model("datasets", DatasetSchema);