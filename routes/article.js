/**
 * Created by node on 6/25/16.
 */
/*
 * 实现article.js的具体功能
 * 用户操作的js和数据库有关
 * 发文章post，
 *
 * */

var express = require('express'),
    articl = require('./articleAction'),
    router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('article',{title:"文章编辑"});
});
router.get('/new',function (req,res) {
    if(req.session.isLogin)
        res.render('post',{title: "创建博文"});
    else
        res.redirect('/');
});
router.post('/new',articl.doCreateArticle);
//添加到草稿箱
router.post('/toDraft',articl.doToDraft);

router.get('/edit',function (req,res) {
    res.send("创建某篇文章");
});
router.post('/edit',function (req,res) {
    res.send("编辑成功");
});

router.get('/delete',function (req,res) {
    res.send("确定删除吗");
});
router.post('/delete',function (req,res) {
    res.send("删除成功");
});


router.get('/getDraft/:id',articl.rtndrfTitle);

//返回文章
router.get('/directory/:id',articl.rtnTitle);

//放弃编辑,返回个人主页
router.get('/cancle',function (req, res) {
    res.redirect('/users/userhome/'+ req.session.username);
});


//返回文章
router.get('/a/:id',articl.rtnArticle);
//返回草稿箱文章
router.get('/d/:id',articl.rtndrfArticle);

router.get('/other/:username')
module.exports = router;
