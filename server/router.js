"use strict";
var login = require('./api/login');
var msgWay = require('./api/msgWay');
var ajaxTest = require('./api/ajaxTest');
var router = function(app){
    login.init(app);
    msgWay.init(app);
    ajaxTest.init(app);
}
module.exports = router;