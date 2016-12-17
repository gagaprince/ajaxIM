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
            var msgObj = req.body;
            var userName = msgObj.userName;
            var msg = msgObj.msg;
            appContext.sendUserMsg(userName,msg);
            res.send({
                code:0
            });
        });

        app.post('/receive',function(req,res){
            var msgs = appContext.getMsgs();
            console.log(JSON.stringify(msgs));
            res.send(msgs);
        });

    }
}
module.exports = msgWay;