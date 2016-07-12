var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var myGame = require('./content');

app.use(jsonParser);

app.post('/draw', function(req, res) {
  res.send(myGame);
});

app.post('/selecting', function(req, res) {
  console.log(req.body.id);
  myGame.movePiece(req.body.id);
  res.send(myGame);
});

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
