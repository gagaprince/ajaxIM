"use strict";

var USER_NAME_KEY = "AJAX_IM_USERNAME";

var main  = {
    init:function(){
        this.initPage();
        this.initUser();
        this.initListener();
    },
    initPage:function(){

    },
    initUser:function(){
        var userName = localStorage.getItem(USER_NAME_KEY);
        if(userName){
            $("#registerFrame").show();
        }else{
            $("#talkFrame").show();
        }
    },
    _registe:function(userName){
        var user = {
            userName:userName
        }
        var sex = Math.random()>0.5?"boy":"girl";
        user["sex"]=sex;
        var url = "regist";
        this._api(url,user,function(res){
            if(res.code==0){
                //注册成功 将名字写入本地
//                localStorage.setItem(USER_NAME_KEY,userName);
//                window.location.reload();
            }else{
                alert(res.desc);
            }
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
    }
}


$(document).ready(function(){
    main.init();
});