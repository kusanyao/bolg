var crypto = require('crypto');

module.exports.checkLogin = function (req,res,next){
	next();
}

var login = function (req,res) {
	if(typeof req.session.user == 'object' && typeof req.session.user.uid == 'number'){
		res.render('error');
	}
	res.render('user/login');
}

var login_ac = function (req,res) {
	if(typeof req.session.user == 'object' && typeof req.session.user.uid == 'number'){
		res.redirect('/');
	}
	if(typeof req.body.usr != 'string' || req.body.usr != 'ksy'){
		res.send('用户名或密码错误');
	}
	if(typeof req.body.pwd != 'string'){
		res.send('用户名或密码错误');
	}
	var md5 = crypto.createHash('md5');
	md5.update(req.body.pwd);
	if(md5.digest('hex') != '202cb962ac59075b964b07152d234b70'){
		res.send('用户名或密码错误');
	}
	req.session.user = {};
	req.session.user.uid = 1;
	req.session.user.nickname = 'ksy';
	res.redirect('/');
}

var logout = function (req,res) {
	req.session.user = {};
	res.redirect('/');
}

var register = function (req,res) {
	if(typeof req.session.user == 'object' && typeof req.session.user.uid == 'number'){
		res.render('error');
	}
	res.redirect('user/register');
}

var register_ac = function (req,res) {
	if(typeof req.session.user == 'object' && typeof req.session.user.uid == 'number'){
		res.render('error');
	}
	res.redirect('user/register');
}


module.exports.login  = login;
module.exports.logout = logout;
module.exports.login_ac = login_ac;