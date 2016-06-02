var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({

	postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	postOwner:{type:String,default:'Umair'},
	postmade:String,
	created: { type: Date, default: Date.now}

});

module.exports = mongoose.model('Post', PostSchema);