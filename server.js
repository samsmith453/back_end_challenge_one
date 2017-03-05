var express = require("express");
var strftime = require("strftime");

var app = express();

app.get("/:date", function(req, res){
    var date = req.params.date;
    var num = Number(date);
    var datify = new Date(date);
    if(!isNaN(num)){
        var obj = {
            "unix": num,
            "human": strftime('%o %B %Y', new Date(num*1000))
        };
        res.send(obj);
    }
    else if(datify!="Invalid Date"){
        var obj = {
            "unix": datify.getTime()/1000,
            "human": strftime('%o %B %Y', datify)
        };
        res.send(obj);
    }
    
    else{
        var now = new Date();
        var obj = {
            "unix": now.getTime(),
            "human": strftime('%o %B %Y', now)
        }
        res.send(obj);
    }
    
    res.end();
});

app.use(express.static("public"));

app.listen(process.env.PORT || <default port>, function(){
    console.log("Connected");
});