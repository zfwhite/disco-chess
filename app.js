var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var myGame = require('./content');

app.use(jsonParser);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('/index.html');
});

app.post('/unselect', function(req, res) {
  myGame.currentPiece = {};
  myGame.moveSet = {};
  myGame.state = 'selecting';
  res.send(myGame);
});

app.post('/draw', function(req, res) {
  res.send(myGame);
});

app.post('/selecting', function(req, res) {
  myGame.movePiece(req.body.id);
  res.send(myGame);
});

app.post('/moving', function(req, res) {
  myGame.movePiece(req.body.id);
  res.send(myGame);
});

app.get('/queen', function(req, res) {
  myGame.queenSide(myGame.currentPlayer.color);
  res.send(myGame);
});

app.get('/king', function(req, res) {
  myGame.kingSide(myGame.currentPlayer.color);
  res.send(myGame);
});

app.get('/default.js', function(req, res) {
  res.sendFile('/public/default.js');
});

app.get('/default.css', function(req, res) {
  res.sendFile('/default.css');
});

app.listen(process.env.PORT || 3000);
