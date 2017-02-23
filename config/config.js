module.exports = {
	website: 'blog',
	domain: 'www.ksy.com',
	port: 80,
	debug: true,
	mysql: {
		host: '127.0.0.1', 
		user: 'root',
		password: '',
		database:'test', // 前面建的user表位于这个数据库中
		port: 3306
	}
};