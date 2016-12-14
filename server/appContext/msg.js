"use strict";
var message = {
    init:function(user,str){
        var msg = {
            "user":user,
            "msg":str,
            "time":new Date().getTime()
        };
        return msg;
    }
}
module.exports = message;