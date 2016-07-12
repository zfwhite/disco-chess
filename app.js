var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/default.js', function(req, res) {
  res.sendFile(__dirname + '/default.js');
});

app.get('/default.css', function(req, res) {
  res.sendFile(__dirname + '/default.css');
});

app.listen(process.env.PORT || 3000);
