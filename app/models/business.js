/*
bznsPreview:
	{
		Comment:
		{
			comment:String,
			userId:Number
		},
		bznsProfile:
		{
			bizName:String,
			bizAddress:String,
			bizcategory:
			{
				catId:Number,
				catName:String
			},
			bizcity:String
		},
		Rating:
		{
			totalReviews:Number,
			avgRating:Number
		}

	}
	*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BusinessSchema = new Schema({

	creator: { type: Schema.Types.ObjectId, ref: 'User' },
	bizName:String,
	bizAddress:String,
	description:String,
	created: { type: Date, default: Date.now},
	Comments:[{
        comment : String
    }]

});

module.exports = mongoose.model('Business', BusinessSchema);