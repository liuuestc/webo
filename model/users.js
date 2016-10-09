/**
 * Created by liuuestc on 16-10-2.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
/* ********************************************
 USER SCHEMA
 ******************************************** */
var userSchema = new Schema({
    name: String, //用户名唯一
    email: {type: String, unique:true}, //邮箱地址唯一
    gender:Boolean, //true = man ;false=woman
    password:String, //加密后的密码
    createdOn: { type: Date, default: Date.now }, //创建时间
    modifiedOn: {type: Date, default: Date.now }, //修改时间
    following: [String], // 我关注的人
    followed: [String], //关注我的文
    likeClass:[String],//喜欢文章的类型
    lastLogin: {type: Date, default: Date.now}   //最后修改时间
});
// Build the User model
var User = mongoose.model( 'User', userSchema );

