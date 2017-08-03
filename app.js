var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var session = require('express-session')

var config = require('./server.config')
var auth = require('./middlewares/auth')
var router = express.Router()
var routes = require('./routes')
var app = express()
// set engine
app.engine('html', ejs.__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.use('/public',express.static(path.join(__dirname,'public')))
// set cookie解析器 与 请求body解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// set session
app.use(session(config.session))
// set auth
app.use(auth.userRequired)

// set route
app.use('/', routes)
// catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  //res.render('common/not-found')
  next(err)
})
// error handle
app.use(function(req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

app.listen(config.port, () => {
   console.log('Server is Start')
})