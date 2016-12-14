"use strict";

var USER_NAME_KEY = "AJAX_IM_USERNAME";

var main  = {
    init:function(){
        this.initPage();
        this.initUser();
        this.initListener();
    },
    initPage:function(){

    },
    initUser:function(){
        var userName = localStorage.getItem(USER_NAME_KEY);
        if(!userName){
            $("#registerFrame").show();
        }else{
            $("#talkFrame").show();
        }
    },
    initListener:function(){

    }
}


$(document).ready(function(){
    main.init();
});