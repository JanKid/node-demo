var meta = require('../server.config').meta
var User = require("../models/base").getModel('user')
exports.index = function(req, res, next) {
    User.find(function(err, data) {
        if (err) console.log(err)
        res.render('home/user', { title: '用户列表', meta,query:'', users: data })
    })
}
exports.search = function(req, res, next) {
    var query = req.body.query || ''
    var params = {}
    if (query) {
        params.username = query
    }
    User.find(params, function(err, data) {
        if (err) console.log(err)
        res.render('home/user', { title: '用户列表', meta, query, users: data })
    })
}
exports.edit = function(req, res, next) {
    var id = req.params.id || ''
    if (!id) {
        res.render('home/edit', { title: '首页', meta, user: {} })
    } else {
        User.findOne({ _id: id }, function(err, data) {
            res.render('home/edit', { title: '首页', meta, user: data })
        })
    }

}
exports.save = function(req, res, next) {
    var id = req.body.id
    if (!id) {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: '123' // 默认密码
        })
        newUser.save(function(err) {
            res.redirect('/home/user')
        })
    } else {
        User.findById({ _id: id }, function(err, data) {
            data.username = req.body.username
            data.email = req.body.email
            data.save(function(err) {
                res.redirect('/home/user')
            })
        })
    }

}
exports.del = function(req, res, next) {
    var id = req.params.id
    if (!id) res.send('删除失败')
    User.remove({ _id: id }, function(err, data) {
        if (err) console.log(err)
        res.redirect('/home/user');
    })
}