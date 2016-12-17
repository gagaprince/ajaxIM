"use strict";
var appContext = require('../appContext/appContext');
var ajaxTest = {
    app:null,
    init:function(app){
        this.app = app;
        this.initController();
    },
    initController:function(){
        var app = this.app;
        app.get('/getTest',function(req,res){
            var query = req.query;
            res.send({
                code:0,
                query:query
            });
        });
        app.post('postTest',function(req,res){
            var query = req.body;
            res.send({
                code:0,
                query:query
            })
        });

    }
}
module.exports = ajaxTest;