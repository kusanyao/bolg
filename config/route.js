//view设置

var fs = require('fs');
//引入
var Index   = require('../action/index.js');
var User    = require('../action/user.js');
var Article = require('../action/article.js');

//路由
module.exports = function (app) {
	app.use(function(req, res, next) {
		res.locals.user = req.session.user || null;
		next();
	});

	app.get('/', Index.index);
	app.get('/article/edit',  User.checkLogin, Article.edit);  //编辑文章页面
	app.get('/article/:id',   User.checkLogin, Article.detail); //文章详情页面
	app.post('/article/save', User.checkLogin, Article.save); //保存文章操作


	// app.get('/login', User.login);
	// app.post('/login_ac', User.login_ac);
	// app.get('/logout', User.logout);
	
}