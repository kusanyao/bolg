/**
 * blog
 */
var express      = require('express');
var bodyParser   = require("body-parser"); 
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var mongoose     = require('mongoose');
var conf         = require('./config/config');

var app          = express();

app.use(function(req,res,next){
	console.log(conf.domain,req.hostname,req.path);
	if(req.hostname != conf.domain){
		return res.redirect('http://' + conf.domain);
	}
	next();
});
//获取post参数
app.use(bodyParser.urlencoded({ extended: false }));
var dbUrl = 'mongodb://localhost/blog';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl); //连接数据库
app.use(cookieParser());

app.use(session({
	secret: '12345',
	name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: {maxAge: 8000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	resave: false,
	saveUninitialized: true,
}));
app.use(express.static('public'));
// 设置模版引擎和views目录
app.set('view engine', 'jade');
app.set('views','./views');

require('./config/route')(app);

// 监听端口
var port = process.env.PORT || conf.port;
app.listen(port, function () {
	console.log('host:' + conf.domain, 'port:' + port);
});