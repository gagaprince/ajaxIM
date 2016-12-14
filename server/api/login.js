"use strict";
var appContext = require('../appContext/appContext');
var login = {
    app:null,
    init:function(app){
        this.app = app;
        this.initController();
    },
    initController:function(){
        var app = this.app;
        app.post('/regist',function(req,res){
            var query  = req.query;
            console.log(query);
            var user = {};
            if(appContext.addUser(user)){
                //如果添加用户成功
                //发送系统消息
                appContext.sendNewUserMsg(user);
            }
        });

    }
}
module.exports = login;