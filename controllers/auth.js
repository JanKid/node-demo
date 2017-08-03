var config = require('../server.config')
var meta = config.meta
var secret = config.cookieSecret
var User = require("../models/base").getModel('user')
var cookieParser = require('cookie-parser')
exports.register = function(req, res, next) {
    if (req.method === 'GET') {
        res.render('auth/register', { title: '注册', meta })
    } else if (req.method === 'POST') {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        newUser.save(function(err, data) {
            if (err) console.log(err)
            res.redirect('/login')
        })
    } else {
        res.render('index', { meta, title: '首页' })
    }
}
exports.login = function(req, res, next) {
    if (req.method === 'GET') {
    	if(req.cookies._site_) {
    		res.redirect('/home')    
    	} else {
    		res.render('auth/login', { title: '登录', meta })
    	}
    } else if (req.method === 'POST') {
    	var username = req.body.username||''
    	var password = req.body.password||''
    	User.findOne({ username:username },function(err,data) {
    		if (err) console.log(err)
    			console.log(data)
        if (data.password == password) {
        	res.cookie('_site_',cookieParser.signedCookie('username:'+username,secret),{ maxAge: 60*10000 })
        	res.redirect('/home')
        } else {
        	res.render('auth/login',{error:1,meta,title:'登录',msg:'用户名密码不正确'})
        }
    	})
    } else {
        res.render('index', { meta, title: '首页' })
    }
}

exports.logout = function(req, res, next) {
    
}