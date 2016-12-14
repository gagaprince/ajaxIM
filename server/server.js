"use strict";
var express = require('express');
var app = express();
var path = require('path');

app.use('/',express.static(__dirname+'/../client/', {
    maxAge: 1e10
}));



var server = app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("开启服务器：http://%s:%s",host,port);
});