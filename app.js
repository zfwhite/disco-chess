var sprite = {
  whiteking: '&#9812;',
  whitequeen: '&#9813;',
  whiterook: '&#9814;',
  whitebishop: '&#9815;',
  whiteknight: '&#9816;',
  whitepawn: '&#9817;',
  blackking: '&#9818;',
  blackqueen: '&#9819;',
  blackrook: '&#9820;',
  blackbishop: '&#9821;',
  blackknight: '&#9822;',
  blackpawn: '&#9823;'
};
var Board = function() {
  this.squares = [];
  var self = this;
  // Draw the squares.
  var color = 'light';
  for (var i = 0; i <= 7; i++) {
    for (var k = 0; k <= 7; k++) {
      if (i + k === 0) {
        color = 'light';
      } else if ((i + k) % 2 === 0) {
        color = 'light';
      } else {
        color = 'dark';
      }
      this.squares.push(Square(i, k, color));
    }
  }
  this.starting = [
    { position: [0, 0], piece: new Piece('rook', 'black')},
    { position: [0, 1], piece: new Piece('knight', 'black')},
    { position: [0, 2], piece: new Piece('bishop', 'black')},
    { position: [0, 3], piece: new Piece('queen', 'black')},
    { position: [0, 4], piece: new Piece('king', 'black')},
    { position: [0, 5], piece: new Piece('bishop', 'black')},
    { position: [0, 6], piece: new Piece('knight', 'black')},
    { position: [0, 7], piece: new Piece('rook', 'black')},
    { position: [1, 0], piece: new Piece('pawn', 'black')},
    { position: [1, 1], piece: new Piece('pawn', 'black')},
    { position: [1, 2], piece: new Piece('pawn', 'black')},
    { position: [1, 3], piece: new Piece('pawn', 'black')},
    { position: [1, 4], piece: new Piece('pawn', 'black')},
    { position: [1, 5], piece: new Piece('pawn', 'black')},
    { position: [1, 6], piece: new Piece('pawn', 'black')},
    { position: [1, 7], piece: new Piece('pawn', 'black')},
    // White
    { position: [7, 0], piece: new Piece('rook', 'white')},
    { position: [7, 1], piece: new Piece('knight', 'white')},
    { position: [7, 2], piece: new Piece('bishop', 'white')},
    { position: [7, 3], piece: new Piece('queen', 'white')},
    { position: [7, 4], piece: new Piece('king', 'white')},
    { position: [7, 5], piece: new Piece('bishop', 'white')},
    { position: [7, 6], piece: new Piece('knight', 'white')},
    { position: [7, 7], piece: new Piece('rook', 'white')},
    { position: [6, 0], piece: new Piece('pawn', 'white')},
    { position: [6, 1], piece: new Piece('pawn', 'white')},
    { position: [6, 2], piece: new Piece('pawn', 'white')},
    { position: [6, 3], piece: new Piece('pawn', 'white')},
    { position: [6, 4], piece: new Piece('pawn', 'white')},
    { position: [6, 5], piece: new Piece('pawn', 'white')},
    { position: [6, 6], piece: new Piece('pawn', 'white')},
    { position: [6, 7], piece: new Piece('pawn', 'white')},
  ]
  // Put the pieces on the squares.
  this.starting.forEach(function(piece) {
    self.squares.forEach(function(square) {
      if (square.row == piece.position[0] && square.column == piece.position[1]) {
        square.piece = piece;
      }
    });
  });
  this.boardHTML = function() {
    for (var row = 0; row <= 7; row++) {
      var theRow = document.createElement('div');
      theRow.classList.add('row');
      for (var column = 0; column <= 7; column++) {
        this.squares.forEach(function(square) {
          if (square.row == row && square.column == column) {
            var theSquare = document.createElement('div');
            theSquare.classList.add('col-xs-1');
            theSquare.classList.add(square.color);
            theSquare.setAttribute('id', row + ',' + column);
            //set the pieces
            if (square.piece.piece === undefined) {
              theSquare.textContent = '';
            } else {
              var pieceType = square.piece.piece.color.concat(square.piece.piece.type);
              theSquare.innerHTML = sprite[pieceType];
            }
            // console.log(square.piece.piece.piece)
            // theSquare.textContent = square.piece.piece.type;
            theRow.appendChild(theSquare);
            $('#board-placement').append(theRow);
          }
        });
      }
    }
  }
  this.move = function() {
  }
}
var Square = function(row, column, color) {
  return {
    row: row,
    column: column,
    color: color,
    piece: {}
  }
}
var Piece = function(type, color) {
  this.type = type,
  this.color = color
}
var Game = function(players) {
  this.board = new Board();
  this.players = players;
  this.currentPlayer = {};
  this.currentPiece = {};
  this.state = '';
  var self = this;
  this.start = function() {
    // Draw the board.
    this.board.boardHTML();
    // Set the player to white for the first turn.
    players.forEach(function(player) {
      if (player.color == 'white') {
        self.currentPlayer = player;
      }
    });
    // Set state to selecting.
    self.state = 'selecting'
  }
  this.nextTurn = function() {
    players.forEach(function(player) {
      if (player.name !== self.currentPlayer.name) {
        self.currentPlayer = player;
      }
    });
  }
}
var Player = function(name, color) {
  this.name = name;
  this.color = color;
}
var ron = new Player('Ron', 'white');
var zach = new Player('Zach', 'black')
var myGame = new Game([ron, zach]);
myGame.start();

var GameInformation = function() {
  this.information = function() {
    var information = document.createElement('div');
    information.classList.add('col-xs-2');
    information.textContent = myGame.currentPlayer.color + ' is ' + myGame.state;
    $('#information').append(information);
  }
}
var play = new GameInformation();
play.information();

var board = document.getElementById('board-placement');
board.addEventListener('click', function(theEvent) {
  var coordinate = theEvent.target.getAttribute('id').split(',');
  var row = coordinate[0];
  var column = coordinate[1];
  if (myGame.state == 'selecting') {
    myGame.board.squares.forEach(function(square) {
      if (square.row == row && square.column == column) {
        console.log(square);
      }
    });
  }
});
