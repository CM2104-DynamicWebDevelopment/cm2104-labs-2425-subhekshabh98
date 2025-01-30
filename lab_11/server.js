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
     res.send("X + Y="+(x+y));
    });

app.listen(8080);