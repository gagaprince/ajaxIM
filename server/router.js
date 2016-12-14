"use strict";
var login = require('./api/login');
var msgWay = require('./api/msgWay');
var router = function(app){
    login.init(app);
    msgWay.init(app);
}
module.exports = router;