"use strict";
var appContext = require('../appContext/appContext');
var login = {
    app:null,
    init:function(app){
        this.app = app;
        this.initController();
    },
    initController:function(){
        console.log("regist api");
        var app = this.app;
        app.all('/regist',function(req,res){
            var user = req.body;
            if(appContext.addUser(user)){
                //如果添加用户成功
                //发送系统消息
                appContext.sendNewUserMsg(user);
                res.send({
                    code:0
                });
            }else{
                res.send({
                    code:1,
                    desc:"添加用户出错"
                });
            }

        });

    }
}
module.exports = login;