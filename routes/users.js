/*
* 用户操作的js和数据库有关
* 发文章post，
*
* */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/post', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
