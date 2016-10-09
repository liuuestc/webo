/**
 * Created by liuuestc on 16-10-3.
 */

$(document).ready(
    function () {


        $('#getBlog').click(function () {
            var getUrl = "/article/directory"+"/0";
            $.get(getUrl,
                function (response, status) {
                    if (status == 'success'){
                        var title ='';
                        var page ='';
                        var pre = "<li><a href='#'>Prev</a></li>";
                        var next = "<li><a href='#'>Next</a></li>";
                        if (response['stat'] == 'ok') {//大于0条数据为ok
                            var titles = response['data'];
                            var num = response['num'];
                            for (var i = 0; i < titles.length; i++){
                                var id = titles[i]['_id'];
                                title = title + addTitle(titles[i]['title'],processDateString(titles[i]['createdOn']),"d/"+id);
                            }
                            $("#blogTitle").html(title);
                            for (var j = 0; j < (num-1)/10 ;j++){
                                page = page + "<li> <a href='javascript:;' onclick='nextPage(this.name)' name =/directory/"+j+">"+(j+1) + "</a></li>";
                            }
                            $("#pagination").html(pre + page + next);
                        }else {
                            alert(username+ status);
                            $("#blogTitle").html("<p class='text-center text-info'>登陆查看更多</p>");
                            $("#pagination").html(pre + page + next);
                        }
                    }else {
                        $("#blogTitle").html("<p class='text-info'>没有获取到文章数据</p>");
                        $("#pagination").html(pre + page + next);
                        alert("与服务器连接失败");
                    }
                });
        });

        $("#getDraft").click(function(){
            $.get('/article/getDraft/0',
            function (response, status) {
                if (status == 'success'){
                    var title ='';
                    var page ='';
                    var pre = "<li><a href='#'>Prev</a></li>";
                    var next = "<li><a href='#'>Next</a></li>";
                    if (response['stat'] == 'ok') {//大于0条数据为ok
                        var titles = response['data'];
                        var num = response['num'];
                        for (var i = 0; i < titles.length; i++){
                            var id = titles[i]['_id'];
                            title = title + addTitle(titles[i]['title'],processDateString(titles[i]['createdOn']),"d/"+id);
                        }
                        $("#draftTitle").html(title);
                        for (var j = 0; j < (num-1)/10 ;j++){
                            page = page + "<li> <a href='javascript:;' onclick='nextPage(this.name)' name =/getDraft/"+j+">  "+(j+1) + "</a></li>";
                        }
                        $("#pagination").html(pre + page + next);
                    }else {
                        $("#draftTitle").html("<p class='text-center text-info'>草稿箱没有数据</p>");
                        $("#pagination").html(pre + page + next);
                    }
                }else {
                    $("#draftTitle").html("<p class='text-info'>您的草稿箱没有数据</p>");
                    $("#pagination").html(pre + page + next);
                    alert("与服务器连接失败");
                }
            });
        });
    }
);

function nextPage(gurl) {
    var getUrl = "/article"+gurl;
    var dora = gurl.split('/')[1];
    var tags = '';
    var tag = '';
    //将返回的数据添加的位置
    if(dora == 'directory'){
        tags = "#blogTitle";
        tag = "a";
    }else {
        tags = "#draftTitle";
        tag = "d";
    }
    $.get(getUrl,function (response, status) {
        if (status == 'success'){
            var title ='';
            if (response['stat'] == 'ok') {//大于0条数据为ok
                var pre = "<li><a href='#'>Prev</a></li>";
                var next = "<li><a href='#'>Next</a></li>";
                var titles = response['data'];
                var num = response['num'];
                for (var i = 0; i < titles.length; i++){
                    var id = titles[i]['_id'];
                    title = title + addTitle(titles[i]['title'],processDateString(titles[i]['createdOn']),tag+"/"+id);
                }
                $(tags).html(title);
                for (var j = 0; j < (num-1)/10 ;j++){
                    page = page + "<li> <a href='javascript:;' onclick='nextPage(this.name)' name =/"+dora+"/"+j+"'>  "+(j+1) + "</a></li>";
                }
                $("#pagination").html(pre + page + next);
            }else {
                $(tags).html("<p class='text-center text-info'>没有更多文章数据</p>");
            }
        }else {
            $(tags).html("<p class='text-info'>没有更多文章数据</p>");
            alert("与服务器连接失败");
        }
    });


}




//下面三个函数用于生成标题列表//还需要添加下面页码的代码
//根据标题返回文章的url，addTitle函数使用
function returnUrl(title,id) {
    var url;
    url = "<a href=" + "/article/" + id +">" + title +"</a>" ;
    return url;
}
//转换时间到字符串, addTitle函数使用
function processDateString(date) {
    var dt = new Date(date.toString());
    return dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate() +
        '  ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}
//返回文件标题,参数可以随意改变
function addTitle(title, date, id) {
    var returnTitle = " <div class=" +" list-group-item> " +
        "<h4 class=" + "list-group-item-heading> "+
        returnUrl(title, id) + "</h4>"+
        " <p class="+"list-group-item-text>"+
        date +
        "</p></div>";
    return returnTitle;
}


//确认提交文章,结果json数据, 填充发表后的页面发表后的页面
function confirmArticle(){
    $('#article').attr('action','/article/new').submit();
}

//放弃提交文章
function cancelArticle() {
    if(confirm("你确信要放弃编辑文章？"))
      location.href="/article/cancle";
}

//推迟发表,并提交到草稿箱
function delayArticle() {
    $('#article').attr('action','/article/toDraft').submit();
}

//个人主页切换
