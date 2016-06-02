var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BusinessSchema = new Schema({

	commentor: { type: Schema.Types.ObjectId, ref: 'User' },
	commentedTo: { type: Schema.Types.ObjectId, ref: 'Business' },
	comment:String,
	bizAddress:String,
	description:String,
	created: { type: Date, defauly: Date.now}

});

module.exports = mongoose.model('Business', BusinessSchema);