//首页
var fs      = require('fs');
var conf    = require('../config/config');
var Article = require('../models/article');

module.exports.index = function (req,res,next){
	var rows = 20;
	var page = parseInt( req.query.page || 1 );
	var skip = ( rows - 1 ) * rows;
	var keyword = req.query.keyword;
	var find = {};

	if(keyword){
		find.$or = [{title: new RegExp(keyword + '.*','i')},{info: new RegExp(keyword + '.*','i')}];
	}
	Article.find(find).sort({'meta.createAt':-1}).skip(skip).limit(rows).exec(function(err, result){
		if (err) {
			return false;
		}
		var data = {
			result: result
		};
		res.render('index/index',data,function(err,html){
	        res.send(html);
	        conf.debug || fs.writeFile('./public/index.html', html);
	    });
	});
}
