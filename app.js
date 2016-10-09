var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');

//用来测试一些功能
//设置mongoodb数据库以及mongoose
var mongoose=require('mongoose');
var dbURI= 'mongodb://localhost/blog'
//mongoose.connect(dbURI);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//用于存储用户名和是否登陆信息。
app.use(session({
        secret: '685862',
        cookie: {maxAge: 80000000},
        resave: false,
        saveUninitialized: true
    }
    )
);

//测试coodie代码
// app.get('/awesome',function (req, res) {
//    if (req.session.lastPage)
//        console.log('Last page was: ' + req.session.lastPage + ".");
//     req.session.lastPage = '/awesome';
//     res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge);
// });
// app.get('/redical',function (req, res) {
//     if (req.session.lastPage)
//         console.log('Last page was: ' + req.session.lastPage + ".");
//     req.session.lastPage = '/radical';
//     res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge);
// });

//逻辑代码部分
app.use('/', routes);                  //游客登陆时处理过程
app.use('/users', users);              //注册用户登陆时处理过程
app.use('/article',article);           //文章发表处理过程

//app.use('/test' ,testFunction);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});






//数据库状态记录
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
//进程结束时关闭与数据库的链接
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});


module.exports = app;
