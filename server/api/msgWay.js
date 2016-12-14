"use strict";
var appContext = require('../appContext/appContext');
var msgWay = {
    app:null,
    init:function(app){
        this.app = app;
        this.initController();
    },
    initController:function(){
        var app = this.app;
        app.post('/send',function(req,res){
            var query  = req.query;
            console.log(query);
            //取username  msg 初始化msg 发送
            var userName = "";
            var msg = "";
            appContext.sendUserMsg(userName,msg);
            res.send("ok");
        });

        app.post('/receive',function(req,res){
            var msgs = appContext.getMsgs();
            res.send(msgs);
        });

    }
}
module.exports = msgWay;