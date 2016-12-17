"use strict";
var message = require('./msg');
var softUserName="小Q";
var users = {};
var msgs = [];
var appContext = {
    init:function(){
        //初始化系统用户
        var user = {
            "userName":softUserName,
            "sex":"boy"
        }
        this.addUser(user);
    },
    addUser:function(user){
        var userName = user.userName;
        if(this.getUser(userName)){
            return false;
        }else{
            users[userName]=user;
            console.log("现在的用户列表：");
            console.log(JSON.stringify(users));
            return true;
        }
    },
    getUser:function(userName){
        return users[userName];
    },
    sendNewUserMsg:function(user){
        var userName = user.userName;
        var sex = user.sex;
        var sexMsg = sex=="boy"?"小王子":"小公主";
        var msg = "欢迎"+sexMsg+" "+userName+" 进入聊天室";
        this.sendSoftMsg(msg);
    },
    sendSoftMsg:function(str){
        var msg = message.init(this.getUser(softUserName),str);
        msgs.push(msg);
        console.log(JSON.stringify(msgs));
    },
    sendUserMsg:function(userName,str){
        var msg = message.init(this.getUser(userName),str);
        msgs.push(msg);
        console.log(JSON.stringify(msgs));
    },
    getMsgs:function(){
        return msgs;
    }
};
appContext.init();
module.exports = appContext;