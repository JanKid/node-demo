var meta = require('../server.config').meta
var Product = require("../models/base").getModel('product')
exports.index = function(req, res, next) {
  
        res.render('product/index', { title: '商品列表', meta,query:'' })
}