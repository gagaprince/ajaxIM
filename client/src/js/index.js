"use strict";

var main  = {
    selfName:"",
    init:function(){
        this.initPage();
        this.initUser();
        this.initListener();
    },
    initPage:function(){

    },
    initTimer:function(){
        //启动一个定时器
        var _this = this;
        _this.receiveMsg();
        setInterval(function(){
            _this.receiveMsg();
        },500);
    },
    initUser:function(){
        $("#registerFrame").show();
    },
    _registe:function(userName){
        var user = {
            "userName":userName
        }
        var sex = Math.random()>0.5?"boy":"girl";
        user["sex"] = sex;
        var _this = this;
        this._api("regist",user,function(res){
            if(res.code==0){
                $("#registerFrame").hide();
                $("#talkFrame").show();
                _this.selfName=userName;
                _this.initTimer();
                $("#talks").html("");
            }else{
                alert(res.desc);
            }

        });

    },
    renderTalk:function(msgs){
        var allHtml = "";
        for(var i=0;i<msgs.length;i++){
            var msg = msgs[i];
            allHtml += this.renderMsg(msg);
        }
        $("#talks").html(allHtml);
        $('#talks').scrollTop( $('#talks')[0].scrollHeight );
    },
    renderMsg:function(msg){
        var user = msg.user;
        var userName = user.userName;
        var msgContent = msg.msg;
        var html = "";
        if(userName==this.selfName){
            //这是我自己说的话
            html=['<div class="line right">',
                '                    <div class="talk-name">'+userName+'</div>',
                '                    <div class="paopao">',
                '                        <font>'+msgContent+'</font>',
                '                        <div class="arrow"></div>',
                '                    </div>',
                '                </div>'].join("");
        }else{
            //这是别人说的话
            html=['<div class="line left">',
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
                $("#msgInput").val("");
            }
        })

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
            var userName = $("#userName").val();
            _this._registe(userName);
        });
        $("#sendBtn").on("click",function(){
            //点击了发送按钮
            var msg = $("#msgInput").val().trim();
            _this.sendMsg(msg);
        });
    }
}


$(document).ready(function(){
    main.init();
});