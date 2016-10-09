/*
* 用户操作的js和数据库有关
* 主要是路由功能，具体实现在
* usersAction.js文件中
* 主要功能，创建用户，登录，退出，找回密码
* */

var express = require('express');
var user = require('./usersAction');
var router = express.Router();

/* GET users listing. */
router.get('/',function (req, res) {
   res.render('profile',{title: 'user'} )
});

//展示用户主页
router.get('/userhome/:userName', user.showProfile);

router.get('/reg',user.createUser);
//router.post('/reg',user.doCreate);

router.post('/reg',user.doCreate);

router.get('/login',function (req,res) {
  res.render("login",{title:'登录!'});
});

router.post('/login',user.doLogin);

router.get('/logout',function (req,res) {
  res.send("退出登录");
});
router.get('/forgetPass',function (req,res) {
  res.render("forgetPassword",{title:"忘记密码"});
});

router.post('/forgetPass',function (req,res) {
  res.send("密码已经发到您的邮箱");
});

//查找文章
router.post('/search',function (req,res) {
  console.log(req.body);
  res.send("你查找的是"+req.param('searchArticle'));
});

//给管理员留言
router.post('/message',function (req,res) {
  res.send("收到留言了！");
});

//test
router.get('/all',user.findAll);

module.exports = router;
