/**
 * Created by node on 6/24/16.
 */
/**创建主要用于用户的创建，修改自己的信息，删除信息**/
var mongoose = require('mongoose');
var db = require('../model/users');
var db2 = require('../model/Article');
var User = mongoose.model('User');
var Article = mongoose.model('Article');



/**转到登注册界面**/
exports.createUser = function (req,res) {
    res.render('reg',{title:'注册!'});
};
//用户注册处理逻辑
exports.doCreate = function (req,res) {
    console.log("创建用户");
    console.log(req.body)
    var man = ("option1" == req.body.optionsRadios);
    User.create({
        name: req.body.username,
        email: req.body.email,
        gender:man,
        password: req.body.password,
        createOn: Date.now(),
        modifiedOn: Date.now(),
        following: null, // 我关注的人
        followed: null, //关注我的文
        likeClass:null,//喜欢文章的类型
        lastLogin: Date.now()
    },function (err,user) {
        if(!err){
            console.log("user create and saved!");
            req.session.username = user.name;
            req.session.isLogin = true;
            res.redirect('/users/userhome/'+user.name);
        }else{
            if(err.code == '11000'){
                res.send("邮箱已经注册")
            }

        }
        if (!user){
            res.send("用户创建失败");
        }
    });
};
//用户登陆处理逻辑
exports.doLogin =  function (req,res) {
    User.findOne(
        {'name' : req.body.username, 'password' : req.body.password},
        function (error, user) {
            if (error) {
                console.log(error);
                res.send('用户名或密码错误');
            }
            req.session.username = user.name;
            req.session.isLogin = true;
            res.redirect('/users/userhome/'+user.name);
        }
    );

};

//用户主页展示
exports.showProfile = function(req, res) {
    //需要判断是否登陆,如果没有登陆则转移到登陆界面
    if(req.session.isLogin){
        if(req.session.username && req.session.username == req.params['userName']){
           rtnProfile(req, res, 'profile')
        }
    } else{
        rtnProfile(req, res, 'Othersprofile')
    }

};
exports.findAll = function(req, res){
    User.find({}).select('title').exec(function (error, data) {
    console.log(data);
    res.json(data);
});
};




//下面三个函数用于生成标题列表//还需要添加下面页码的代码
//（1）根据标题返回文章的url，addTitle函数使用
function returnUrl(title,id) {
    var url;
    url = "<a href=" + "/article/a/" + id +">" + title +"</a>" ;
    return url;
}
//（2）转换时间到字符串, addTitle函数使用
function processDateString(date) {
    var dt = new Date(date.toString());
    return dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate() +
        '  ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}
//（3）返回文件标题,参数可以随意改变
function addTitle(title, date, id) {
    var returnTitle = " <div class=" +" list-group-item> " +
        "<h4 class=" + "list-group-item-heading> "+
        returnUrl(title, id) + "</h4>"+
        " <p class="+"list-group-item-text>"+
        date +
        "</p></div>";
    return returnTitle;
}
//（4）用于第一次返回博主主页，使用上面三个函数，showProfile使用
function rtnProfile(req, res, profilename) {
    Article.count({
        author: req.params['userName']
    },function (error, num) {
        if (!error){
            //如果有数据
            var atitle = '';
            var apage ='';
            Article.find({
                    author: req.params['userName']
                },
                'title _id createdOn',
                {sort: '-_id',
                    limit : 10},
                function (error, data) {
                    if(!error){
                        var pre = "<li><a href='#'>Prev</a></li>";
                        var next = "<li><a href='#'>Next</a></li>";
                        for (var i = 0; i < data.length; i++){
                            var id = data[i]['_id'];
                            atitle = atitle + addTitle(data[i]['title'],processDateString(data[i]['createdOn']),id);
                        }
                        for (var j = 0; j < (num-1)/10 ;j++)
                            apage = apage + "<li> <a href='javascript:;' onclick='nextPage(this.name)' name =/directory/"+j+">  "+(j+1) + "</a></li>";
                        apage = pre + apage + next;
                        res.render(profilename,{title: req.params['userName'], returnTitle: atitle, pageSplit: apage});
                    }
                    else {
                        console.log(error);
                    }
                });//end 渲染

        }else {
            console.log(error)
        }
    });

}
