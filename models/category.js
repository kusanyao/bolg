var mongoose=require('mongoose');
var CategorySchema=require('../schemas/category');

var Category=mongoose.model('category',CategorySchema); //生成数据的表 ('表名','数据结构')

module.exports=Category //导出