var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var ArticleSchema = new Schema({
	title: String,
	content: String,
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