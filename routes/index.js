/*登录主页时返回的网页上，主页上有注册，登录，以及使用其他帐号登录*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'starFarming'});
});

//查找文章
router.post('/search',function (req,res) {
  console.log(req.body);
  res.send("你查找的是"+req.param('searchArticle'));
});

//测试ajax接口
router.get('/ajax',function (req,res) {
  res.render('testajax');
});

router.get('/json',function(req,res){
  res.send({status:'json'});
});
router.get('/jsonp',function (req,res) {
  res.jsonp({status:'jsonp'});
});
module.exports = router;
