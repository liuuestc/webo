/**
 * Created by liuuestc on 16-10-2.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/* ********************************************
 Article SCHEMA
 ******************************************** */
var articleSchema = new Schema({
    title: String,
    author: String,
    content: String,
    createdOn: { type: Date, default: Date.now }, //创建时间
    modifiedOn: {type: Date, default: Date.now }, //修改时间
    goods : [String], //点赞的人
    comments : [String] //评论的人
});
// Build the article model
var Article = mongoose.model( 'Article', articleSchema );

var draftSchema = new Schema({
    title: String,
    author: String,
    content: String,
    createdOn: { type: Date, default: Date.now }, //创建时间
    modifiedOn: {type: Date, default: Date.now }, //修改时间
});
// Build the article model
var Draft = mongoose.model( 'Draft', draftSchema );