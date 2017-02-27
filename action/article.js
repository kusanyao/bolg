var _       = require('underscore');
var Article = require('../models/article');


module.exports.save = function (req,res) {
	var _articleObj = {
		title: req.body.title,
		content: req.body.content
	};

	var _saveArticle = function(article){
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
			_article = _.extend(result,_articleObj);
			_saveArticle(_article);
		});
	}else{
		var _article = new Article(_articleObj);
		_saveArticle(_article);
	}
}

module.exports.detail = function (req,res) {
	var id = req.params.id;
	Article.findById(id,function(err,result){
		if(err){
			return res.redirect('/');
		}
		res.render('article/detail',{article:result});
	});
}

module.exports.list = function () {
	
}

module.exports.edit = function (req,res) {
	if(req.query.id){
		Article.findById(req.query.id,function(err,result){
			if(err){
				return res.redirect('/');
			}
			res.render('article/edit',{article:result});
		});
	}else{
		res.render('article/edit');
	}
}
