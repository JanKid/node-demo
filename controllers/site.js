var meta = require('../server.config').meta
var cookieParser = require('cookie-parser')
var config = require('../server.config')
exports.index = function(req, res, next) {
	console.log(req.method)
	res.render('index', { title: '注册',meta, })
}

exports.home = function(req, res, next) {
	if (req.cookies._site_) {
		var userNameStr = cookieParser.signedCookie(req.cookies._site_,config.cookieSecret)
		var userName = userNameStr.split(':')[1]
		res.render('home/index', { title: '主要页面',meta, username: userName })
	} else {
		res.redirect('/')
	}
}
