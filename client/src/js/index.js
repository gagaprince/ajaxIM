"use strict";

var USER_NAME_KEY = "AJAX_IM_USERNAME";

var main  = {
    selfName:"",
    init:function(){
        this.initPage();
        this.initUser();
        this.initListener();
    },
    initPage:function(){
        $("#talks").html("");
    },
    initTimer:function(){
        var _this = this;
        setInterval(function(){
            _this.receiveMsg();
        },1000);
    },
    initUser:function(){
        var userName = localStorage.getItem(USER_NAME_KEY);
        if(!userName){
            $("#registerFrame").show();
        }else{
            $("#talkFrame").show();
            this.selfName = userName;
            this.initTimer();
        }
    },
    _registe:function(userName){
        var user = {
            userName:userName
        }
        var sex = Math.random()>0.5?"boy":"girl";
        user["sex"]=sex;
        var url = "regist";
        var _this=this;
        this._api(url,user,function(res){
            if(res.code==0){
                //注册成功 将名字写入本地
//                localStorage.setItem(USER_NAME_KEY,userName);
//                window.location.reload();
                _this.selfName=userName;
                $("#registerFrame").hide();
                $("#talkFrame").show();
                _this.initTimer();
            }else{
                alert(res.desc);
            }
        });
    },
    renderTalk:function(msgs){
        var talkHtml = "";
        var len = msgs.length;
        for(var i=0;i<len;i++){
            var msg = msgs[i];
            talkHtml+=this.renderMsg(msg);
        }
        $("#talks").html(talkHtml);
        $('#talks').scrollTop( $('#talks')[0].scrollHeight );
    },
    renderMsg:function(msg){
        var user = msg.user;
        var userName = user.userName;
        var msgContent = msg.msg;
        var html = "";
        if(userName==this.selfName){
            //这是我自己说的话
            html = ['<div class="line right">',
                '                    <div class="talk-name">'+userName+'</div>',
                '                    <div class="paopao">',
                '                        <font>'+msgContent+'</font>',
                '                        <div class="arrow"></div>',
                '                    </div>',
                '                </div>'].join("");
        }else{
            //这是别人说的话
            html = ['<div class="line left">',
                '                    <div class="talk-name">'+userName+'</div>',
                '                    <div class="paopao">',
                '                        <font>'+msgContent+'</font>',
                '                        <div class="arrow"></div>',
                '                    </div>',
                '                </div>'].join("");
        }
        return html;
    },
    sendMsg:function(msg){
        var msgObj = {
            msg:msg,
            userName:this.selfName
        }
        var url = "send";
        this._api(url,msgObj,function(res){
            if(res.code==0){
                console.log("sendmsg \n"+JSON.stringify(msgObj)+"\nsuccess") ;
            }
        });
    },
    receiveMsg:function(){
        var url = "receive";
        var _this = this;
        this._api(url,{},function(res){
            console.log(res);
            _this.renderTalk(res);
        });
    },
    _api:function(url,data,callback){
        $.ajax({
            url:url,
            data:JSON.stringify(data),
            contentType:"application/json; charset=UTF-8",
            type : 'POST',
            dataType : 'json',
            timeout : 3e4,
            success:function(res){
                if(callback){
                    callback(res);
                }
            }
        });
    },
    initListener:function(){
        var _this = this;
        $("#loginBtn").on("click",function(){
            //点击了登录
            var userName = $("#userName").val().trim();
            if(userName!=""){
                _this._registe(userName);
            }
        });
        $("#sendBtn").on("click",function(){
            var msg = $("#msgInput").val().trim();
            if(msg!=""){
                _this.sendMsg(msg);
                $("#msgInput").val("");
            }
        });
    }
}


$(document).ready(function(){
    main.init();
});