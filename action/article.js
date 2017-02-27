
module.exports.list = function () {
	
}

module.exports.edit = function (req,res) {
	res.render('article/edit');
}

module.exports.edit_ac = function (req,res) {
	console.log(req.body);
	console.log(req.body.article);
}