var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send("Hello world! by express");
});

app.get('/test', function(req, res){
    res.send("this is route 2");
});

app.get('/add', function(req, res){
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);
    var oprator = req.query.operator;
     res.send("X + Y="+(x+y));
    });
    app.get('/calc', function(req, res){
        var x = parseInt(req.query.x);
        var y = parseInt(req.query.y);
        if (operator=== "add"){
            res.send ("x+y="+(x+y));
        }
         else if (operator=== "sub"){
            res.send ("x-y="+(x-y));
        }
        
        else if (operator=== "mul"){
            res.send ("x*y="+(x*y));
        }
        else  if(operator=== "div"){
            res.send ("x/y="+(x/y));
        }
        
        });

app.listen(8080);