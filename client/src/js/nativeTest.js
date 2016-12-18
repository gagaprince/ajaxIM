var xmlhttp;
function ajax(url,callback){
    function state_Change(){
        console.log("xml http state change :");
        console.log(xmlhttp.readyState);
        if (xmlhttp.readyState==4)
        {// 4 = "loaded"
            if (xmlhttp.status==200)
            {// 200 = "OK"
                if(callback){
                    callback(xmlhttp.responseText);
                }
            }
            else
            {
                alert("Problem retrieving data:" + xmlhttp.statusText);
            }
        }
    }
    xmlhttp=null;
    if (window.XMLHttpRequest)
    {// code for Firefox, Opera, IE7, etc.
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp!=null)
    {
        xmlhttp.onreadystatechange=state_Change;
        xmlhttp.open("GET",url,true);
        xmlhttp.send(null);
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
}

var btn = document.getElementById("btn");
btn.addEventListener("click",function(){
    var url = "getTest?name=gaga&sex=boy";
    ajax(url,function(res){
        console.log(res);
        var testDom = document.getElementsByClassName("test")[0];
        testDom.innerHTML=res;
    });
},false);

