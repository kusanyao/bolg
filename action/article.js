var _       = require('underscore');
var Article = require('../models/article');

module.exports.list = function () {
	
}

module.exports.edit = function (req,res) {
	res.render('article/edit');
}

module.exports.edit_ac = function (req,res) {
	var _articleObj = {
		title: req.body.title,
		content: req.body.content
	};

	var saveArticle = function(article){
		article.save(function(err,result){
			if(err){
				return res.json({code:101,msg:'保存失败'});
			}
			return res.json({code:1,msg:'保存成功'});
		});
	};

	if(req.body.id){ //更新
		Article.findById(req.body.id,function(err,result){
			if(err){
				return res.json({code:'100','msg':'找不到数据'});;
			}
			_article = _.extend(result,articleObj);
			return saveArticle(_article);
		});
	}else{
		var _article = new Article(_articleObj);
		return saveArticle(_article);
	}
}

