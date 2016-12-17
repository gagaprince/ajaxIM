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

    },
    initUser:function(){
        $("#registerFrame").show();
    },
    _registe:function(userName){
        var user = {
            userName:userName
        }
        var sex = Math.random()>0.5?"boy":"girl";
        user["sex"]=sex;

    },
    renderTalk:function(msgs){

    },
    renderMsg:function(msg){
        var user = msg.user;
        var userName = user.userName;
        var msgContent = msg.msg;
        var html = "";
        if(userName==this.selfName){
            //这是我自己说的话

        }else{
            //这是别人说的话

        }
        return html;
    },
    sendMsg:function(msg){
        var msgObj = {
            msg:msg,
            userName:this.selfName
        }
        var url = "send";

    },
    receiveMsg:function(){
        var url = "receive";
        var _this = this;

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

        });
        $("#sendBtn").on("click",function(){
            //点击了发送按钮
        });
    }
}


$(document).ready(function(){
    main.init();
});