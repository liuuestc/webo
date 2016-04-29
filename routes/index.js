/*登录主页时返回的网页上，主页上有注册，登录，以及使用其他帐号登录*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'starFarming'});
});

router.get('/reg',function (req,res) {
  res.render('reg',{title:'注册!'});
});

router.get('/login',function (req,res) {
  res.render("login",{title:'登录!'});
});

router.get('/forgetPass',function (req,res) {
  res.render("forgetPassword",{title:"忘记密码"})
});

module.exports = router;
