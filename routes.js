var express = require('express')
var router = express.Router()
var siteCtrl = require('./controllers/site')
var userCtrl = require('./controllers/user')
var authCtrl = require('./controllers/auth')
var productCtrl = require('./controllers/product')

router.get('/',siteCtrl.index)
router.get('/register',authCtrl.register).post('/register',authCtrl.register)
router.get('/login',authCtrl.login).post('/login',authCtrl.login)

router.get('/home',siteCtrl.home)
router.get('/home/user',userCtrl.index).post('/home/user',userCtrl.search)
router.get('/home/user/edit/:id?',userCtrl.edit)
router.post('/home/user/save',userCtrl.save)
router.get('/home/user/del/:id?',userCtrl.del)

router.get('/home/product',productCtrl.index)

module.exports = router