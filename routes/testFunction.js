/**
 * Created by liuuestc on 16-10-2.
 */
var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('article',{title:"文章编辑"});
});