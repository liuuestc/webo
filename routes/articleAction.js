/**
 * Created by node on 6/24/16.
 */
/**主要用于用户创建博文，修改文章，删除文章使用**/
var mongoose = require('mongoose');
var db = require('../model/Article');
var Article = mongoose.model('Article');
var Draft = mongoose.model('Draft');
var dbURI = 'mongodb://localhost/MongoosePM';
mongoose.connect(dbURI);
//存储到文章的数据库
exports.doCreateArticle = function (req, res) {
    console.log(req.body);
    Article.create({
        title: req.body.title,
        author: req.session.username, //从session中获取
        content: req.body.thecontent,
        createdOn: Date.now(), //创建时间
        modifiedOn:Date.now(), //修改时间
        goods : null, //点赞的人
        comments : null //评论的人
    },function (err, article) {
        if (!err){
            //需要修改
            res.redirect('/users/userhome/'+article.author);
            //res.render('posted', {title : '发表成功', 'articleTitle': article.title ,'author' :article.author, 'content' : article.content,'postTime' : article.createdOn});
        }
        else {
            console.log(err);
            res.json({'stat':'error','user':'article.author'});
        }
    });
};
//存储到草稿的数据库
exports.doToDraft = function (req, res) {
    console.log(req.body);
    Draft.create({
        title: req.body.title,
        author: req.session.username, //从session中获取
        content: req.body.thecontent,
        createdOn: Date.now(), //创建时间
        modifiedOn:Date.now() //修改时间
    },function (err, article) {
        if (!err){
            //需要修改
            res.redirect('/users/userhome/'+article.author);
        }
        else {
            console.log(err);
            res.json({'stat':'error','user':'article.author'});
        }
    });
};

//返回title列表
exports.rtnTitle = function (req, res) {
    if (!req.session.isLogin){
        res.json({'stat':'err'});
    }else {
        Article.count({author: req.session.username},
            function (error,num) {
                if(!error){
                    Article.find(
                        {author:req.session.username},
                        'title createdOn _id',
                        {sort: '-_id',skip:parseInt(req.params['id'])*10, limit: 10},
                        function (error,data) {
                            if (!error){
                                res.json({'stat': 'ok', 'num': num, 'data':data});
                            }else
                                res.json({'stat':'err'});
                        });
                }else {
                    res.json({'stat':'err'});
                }
            });
    }
};

//返回草稿箱列表
exports.rtndrfTitle = function (req, res) {
    Draft.count({author: req.session.username},
        function (error,num) {
            if((!error) && (num!=0)){
                Draft.find(
                    {author:req.session.username},
                    'title createdOn _id',
                    {sort: '-_id',skip:parseInt(req.params['id'])*10, limit: 10},
                    function (error,data) {
                        if (! error){
                            res.json({'stat': 'ok', 'num': num, 'data':data});
                        }else
                            res.json({'stat':'err'});
                    });
            }else {
                console.log(typeof num + num);
                res.json({'stat':'err'});
            }
        });
};
//根据id返回文章
exports.rtnArticle = function (req, res) {
  Article.findById(req.params['id'],
      function (error, article) {
            if(!error)
                res.render('posted', {title : '发表成功', 'articleTitle': article.title ,'author' :article.author, 'content' : article.content,'postTime' : article.createdOn});
         });
};

exports.rtndrfArticle = function (req,res) {
    Draft.findById(req.params['id'],
        function (error, article) {
            if(!error)
                res.render('posted', {title : '返回文章', 'articleTitle': article.title ,'author' :article.author, 'content' : article.content,'postTime' : article.createdOn});
        });
};