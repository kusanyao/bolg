var mongoose = require('mongoose');
var Schema   = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ArticleSchema = new Schema({
	title:String,
	origin:String,
	author:String,
	link:String,
	info:String,
	detail:String,
	views:Number,
	jviews:Number,
	category: [{type: ObjectId, ref: 'category'}],
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

ArticleSchema.pre('save',function(next){
	this.meta.updateAt = Date.now();
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt;
	}
	next();
});

ArticleSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort({'meta.createAt':-1}).exec(cb);
	},
	findById:function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	}
};

module.exports = ArticleSchema;