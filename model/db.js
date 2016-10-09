/**
 * Created by node on 6/24/16.
 */
var mongoose = require( 'mongoose' ),
    dbURI = 'mongodb://localhost/MongoosePM';
mongoose.connect(dbURI);

// Connection events snipped out for brevity


/* **********************************************
 MESSAGE SCHEMA
 ********************************************* */
var messageSchema = new mongoose.Schema({
    id : Number, //回复的序号
    reply: String, //回复的内容
    answer: String //回复回复的内容
});


/* ********************************************
 BLOG SCHEMA
 ******************************************** */
var ArticleSchema = new mongoose.Schema({
    Title: String,                                //文章题目
    createdOn: { type: Date, default: Date.now },  //创建时间
    modifiedOn: Date, //最后修改时间
    comment: Number,   //评论数
    readNum: Number,  //阅读次数
    class: [String],         //文章所属类别
    replyMessage :  [messageSchema]//文章评论id
});
// Build the Project model
mongoose.model('Project',ArticleSchema);


