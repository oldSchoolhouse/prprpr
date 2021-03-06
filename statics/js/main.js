$('.menu a').click(function(){
    target = $(this).attr('goto');
    switchTo(target);
    $('.menu li a').each(function(){
        $(this).removeClass('active');
    });
    $(this).addClass('active');
});

function switchTo(target){
    $('.right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function getAchives(){
    t = ``;
    $.ajax({
        type:"GET",
        url:"https://www.moecat.tk/wp-json/wp/v2/posts?per_page=8&page=1",
        dataType:"json",
        success:function(json){
            for(var i = 0;i < json.length;i++){
                title = json[i].title.rendered;
                link = json[i].link;
                time = new Date(json[i].date).Format("yyyy-MM-dd");
                t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
                $('.archive-list').html(t);
            }
        }
    })
}

function gethitokoto(){
    $.ajax({
        type:"GET",
        url:"https://api.moecat.tk/hitokoto?encode=json",
        dataType:"json",
        success:function(result){
            write(result.hitokoto);
        },
        error:function(){
            $('#hitokoto').html("Error: Failed to get hitokoto.");
        }
    });
}

function write(text){
    if (text.length < 25) {
        $('#hitokoto').html(text);
    } else {
        gethitokoto();
    }
}

$(function(){
    $.ajax({
        type:"GET",
        url:"https://api.moecat.tk/163?type=playlist&id=2003373695",
        success:function(e){
            var a = new APlayer({
                element:document.getElementById("ap-f"),
                autoplay:false,
                fixed:true,
                loop:"all",
                order:"list",
                listFolded:true,
                showlrc:3,
                theme:"#e6d0b2",
                listmaxheight:"200px",
                music:eval(e)
            });
            window.aplayers || (window.aplayers = []),
                window.aplayers.push(a)
        }
    })
})

// ???Date??????????????? Date ????????????????????????String
// ???(M)??????(d)?????????(h)??????(m)??????(s)?????????(q) ????????? 1-2 ???????????????
// ???(y)????????? 1-4 ?????????????????????(S)????????? 1 ????????????(??? 1-3 ????????????)
// ?????????
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt){ //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //??????
        "d+": this.getDate(), //???
        "h+": this.getHours(), //??????
        "m+": this.getMinutes(), //???
        "s+": this.getSeconds(), //???
        "q+": Math.floor((this.getMonth() + 3) / 3), //??????
        "S": this.getMilliseconds() //??????
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(document).ready(function(){
    getAchives();
    gethitokoto();
    setTimeout(function(){$(".loading").hide();},1500);
});
