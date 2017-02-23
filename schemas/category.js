var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var CategorySchema=new Schema({
	title:String,
	sequence:Number,
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

CategorySchema.pre('save',function(next){
	this.meta.updateAt = Date.now();
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt;
	}
	next();
});

CategorySchema.statics={
	fetch:function(cb){
		return this.find({}).sort({'sequence':1}).exec(cb);
	},
	findById:function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	}
};

module.exports=CategorySchema //导出数据结构