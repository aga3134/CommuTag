var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
	uploadFrom: String,		//user or api
	uploader: String,		//user id or api token	
	annotation:{			//annotation data
		type: mongoose.Schema.Types.Mixed,
		default: null
	},
	verification:{				//annotation verification data
		type: [mongoose.Schema.Types.Mixed],
		default: []
	},
	formReply:{			//reply for dataset form
		type: mongoose.Schema.Types.Mixed,
		default: null
	},
	verifyNum: {		//total number in verification
		type: Number,
		default: 0
	},
	agreeNum: {		//agree number in varification
		type: Number,
		default: 0
	},
	lat: Number,
	lng: Number,
	remark: String,
	dataTime: Date
},{timestamps: {createdAt:"createdAt", updatedAt:"updatedAt"} });

module.exports = ImageSchema;