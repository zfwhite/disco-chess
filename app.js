var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jsonParser = require('body-parser').json();
var myGame = require('./game-logic');

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
  socket.on('moved', function(board) {
    io.emit('moved', board);
  });
});

app.use(jsonParser);
app.use(express.static(__dirname + '/public'));

app.get('/unselect', function(req, res) {
  myGame.currentPiece = {};
  myGame.moveSet = {};
  myGame.state = 'selecting';
  res.send(myGame);
});

app.get('/draw', function(req, res) {
  res.send(myGame);
});

app.post('/moving', function(req, res) {
  myGame.movePiece(req.body.id);
  res.send(myGame);
});

app.get('/reset', function(req, res) {
  myGame.reset();
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

app.post('/promotion', function(req, res) {
  var promotion = req.body.promotion;
  myGame.givePromotion(promotion.promote, promotion.location, promotion.pieceColor);
  res.send(myGame);
});

http.listen(process.env.PORT || 3000);
