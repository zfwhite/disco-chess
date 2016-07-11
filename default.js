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
var DrawHTML = function() {
  this.promotePawn = function () {
    if (myGame.pawnPromotion === true) {
      var promotion = prompt('Enter "queen" or "knight" to be promoted.');
      return promotion;
    }
  }
  this.boardHTML = function() {
    for (var row = 0; row <= 7; row++) {
      var theRow = document.createElement('div');
      theRow.classList.add('row');
      for (var column = 0; column <= 7; column++) {
        myGame.board.squares.forEach(function(square) {
          if (square.row == row && square.column == column) {
            var theSquare = document.createElement('div');
            theSquare.classList.add('col-xs-1');
            theSquare.classList.add(square.color);
            theSquare.setAttribute('id', row + ',' + column);
            // Set the pieces.
            if (square.piece.piece === undefined) {
              theSquare.textContent = '';
            } else if (square.piece.piece.color) {
              var pieceType = square.piece.piece.color.concat(square.piece.piece.type);
              theSquare.innerHTML = sprite[pieceType];
            } else {
              theSquare.textContent = '';
            }
            theRow.appendChild(theSquare);
            $('#board-placement').append(theRow);
          }
        });
      }
    }
  }

  this.statusHTML = function() {
    var status = document.createElement('div');
    var playerName = document.createElement('div');
    playerName.textContent = 'Player Name: ' + myGame.currentPlayer.name;
    var playerColor = document.createElement('div');
    playerColor.textContent = 'Player Color: ' + myGame.currentPlayer.color;
    var state = document.createElement('div');
    state.textContent = 'Player State: ' + myGame.state;
    if (myGame.currentPiece.piece !== undefined) {
      var piece = document.createElement('div');
      piece.textContent = 'Current Piece: ' + myGame.currentPiece.piece.color + " " + myGame.currentPiece.piece.type;
      status.appendChild(piece);
    }
    status.appendChild(playerName);
    status.appendChild(playerColor);
    status.appendChild(state)
    return status;
  }

  document.body.addEventListener('click', function(theEvent) {
    if (myGame.movePiece !== undefined) {
      myGame.movePiece(theEvent.target);
    }
  });
}
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
  this.draw = new DrawHTML();
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
  this.moveSet = {};
  this.state = '';
  this.lastLocation = '';

  this.removedPiece = {};
  this.lastMove = {};

  this.pawnPromotion = false;

  var self = this;
  this.start = function() {
    // Draw the board.
    this.board.draw.boardHTML();
    // Set the player to white for the first turn.
    players.forEach(function(player) {
      if (player.color == 'white') {
        self.currentPlayer = player;
      }
    });
    // Set state to selecting.
    self.state = 'selecting'
  }

  //Pawn promotion functions
  this.checkPromotion = function(row, color, piece) {
    if (((color === 'white' && row === 0) || (color === 'black' && row === 7)) && piece === 'pawn') {
      myGame.pawnPromotion = true;
    }
  }
  this.givePromotion = function(location, piece, color) {
    // var coordinates = location.split(',');
    var row = parseInt(location[0]);
    var column = parseInt(location[1]);
    for (const square of myGame.board.squares) {
      if (square.row == row && square.column == column) {
        square.piece.piece.type = piece;
        square.piece.piece.color = color;
      }
    }
  }

  // Check if castling is possible.
  this.castleCheck = function(color) {
    myGame.board.squares.forEach(function(square) {
      if (color === 'white') {
        if (square.column === 4 && square.row === 7) {
          if (square.piece.piece === undefined || square.piece.piece.type !== 'king') {
            white.queenCastle = false;
            white.kingCastle = false;
          }
        } else if (square.column === 0 && square.row === 7) {
          if (square.piece.piece === undefined || square.piece.piece.type !== 'rook') {
            white.queenCastle = false;
          }
        } else if (square.column === 7 && square.row === 7) {
          if (square.piece.piece === undefined || square.piece.piece.type !== 'rook') {
            white.kingCastle = false;
          }
        }
      } else if (color === 'black') {
        if (square.column === 4 && square.row === 0) {
          if (square.piece.piece === undefined || square.piece.piece.type !== 'king') {
            black.queenCastle = false;
            black.kingCastle = false;
          }
        } else if (square.column === 0 && square.row === 0) {
          if (square.piece.piece === undefined || square.piece.piece.type !== 'rook') {
            black.queenCastle = false;
          }
        } else if (square.column === 7 && square.row === 0) {
          if (square.piece.piece === undefined || square.piece.piece.type !== 'rook') {
            black.kingCastle = false;
          }
        }
      }
    });
  }

  // Makes the kingside castle move.
 this.kingSide = function(color) {
   var castle = true;
   for (const square of myGame.board.squares) {
     if (color === 'white' && myGame.currentPlayer.color === 'white') {
       if (square.column === 6 && square.row === 7) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       } else if (square.column === 5 && square.row === 7) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       }
     } else if (color === 'black' && myGame.currentPlayer.color === 'black') {
       if (square.column === 6 && square.row === 0) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       } else if (square.column === 5 && square.row === 0) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       }
     }
   }
   for (const squares of myGame.board.squares) {
     if (castle === true && color === 'white' && white.kingCastle === true && myGame.currentPlayer.color === 'white') {
       if (squares.column === 4 && squares.row === 7) {
         squares.piece = {};
       } if (squares.column === 7 && squares.row === 7) {
         squares.piece = {};
         $('#board-placement').empty();
         myGame.board.draw.boardHTML();
         myGame.nextTurn();
       }
       if (squares.column === 6 && squares.row === 7) {
        squares.piece = {piece: {color: 'white', type: 'king'}};
      } else if (squares.column === 5 && squares.row === 7) {
        squares.piece = {piece: {color: 'white', type: 'rook'}};
       }
     } else if (castle === true && color === 'black' && black.kingCastle === true && myGame.currentPlayer.color === 'black') {
       if (squares.column === 4 && squares.row === 0) {
         squares.piece = {};
       } else if (squares.column === 7 && squares.row === 0) {
         squares.piece = {};
         $('#board-placement').empty();
         myGame.board.draw.boardHTML();
         myGame.nextTurn();
       }
       if (squares.column === 6 && squares.row === 0) {
        squares.piece = {piece: {color: 'black', type: 'king'}};
      } else if (squares.column === 5 && squares.row === 0) {
        squares.piece = {piece: {color: 'black', type: 'rook'}};
       }
     }
   }
 }

 // Queen side castling.
 this.queenSide = function(color) {
   var castle = true;
   for (const square of myGame.board.squares) {
     if (color === 'white' && myGame.currentPlayer.color === 'white') {
       if (square.column === 1 && square.row === 7) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       } else if (square.column === 2 && square.row === 7) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       } else if (square.column === 3 && square.row === 7) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       }
     } else if (color === 'black' && myGame.currentPlayer.color === 'black') {
       if (square.column === 1 && square.row === 0) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       } else if (square.column === 2 && square.row === 0) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       } else if (square.column === 3 && square.row === 0) {
         if (square.piece.piece !== undefined) {
          castle = false;
         }
       }
     }
   }
   for (const squares of myGame.board.squares) {
     if (castle === true && color === 'white' && white.queenCastle === true && myGame.currentPlayer.color === 'white') {
       if (squares.column === 0 && squares.row === 7) {
         squares.piece = {};
       } else if (squares.column === 2 && squares.row === 7) {
         squares.piece = {};
       } else if (squares.column === 4 && squares.row === 7) {
         squares.piece = {};
         $('#board-placement').empty();
         myGame.board.draw.boardHTML();
         myGame.nextTurn();
       }
       if (squares.column === 2 && squares.row === 7) {
        squares.piece = {piece: {color: 'white', type: 'king'}};
      } else if (squares.column === 3 && squares.row === 7) {
        squares.piece = {piece: {color: 'white', type: 'rook'}};
       }
     } else if (castle === true && color === 'black' && black.queenCastle === true && myGame.currentPlayer.color === 'black') {
       if (squares.column === 0 && squares.row === 0) {
         squares.piece = {};
       } else if (squares.column === 2 && squares.row === 0) {
         squares.piece = {};
       } else if (squares.column === 4 && squares.row === 0) {
         squares.piece = {};
         $('#board-placement').empty();
         myGame.board.draw.boardHTML();
         myGame.nextTurn();
       }
       if (squares.column === 2 && squares.row === 0) {
        squares.piece = {piece: {color: 'black', type: 'king'}};
      } else if (squares.column === 3 && squares.row === 0) {
        squares.piece = {piece: {color: 'black', type: 'rook'}};
       }
     }
   }
 }

// Checks if a player has been put in check.
  this.inCheck = function() {
     // Run all possible moves for all opponents pieces, checking for king location.
     myGame.board.squares.forEach(function(square) {
       if (square.piece.piece != undefined) {
         var moves = checkMoves(square);
         self.moveSet.forEach(function(move) {
           move.forEach(function(look) {
             if (look.piece.piece != undefined && look.piece.piece.type == 'king') {
               if (look.piece.piece.color != myGame.currentPlayer.color) {
                 window.alert(look.piece.piece.color + ' ' + look.piece.piece.type + ' is in check!');
                 myGame.undoMove();
               }
             }
           })
         });
       }
     })
   }

   this.nextTurn = function() {
     if (self.currentPlayer == players[0]) {
       self.currentPlayer = players[1];
       self.state = 'selecting';
       self.currentPiece = {};
       self.moveSet = {};
     } else {
       self.currentPlayer = players[0];
       self.state = 'selecting';
       self.currentPiece = {};
       self.moveSet = {};
     }
     self.inCheck();
   }

  this.undoMove = function() {
    myGame.board.squares.forEach(function(square) {
      if (square.column == self.removedPiece.column && square.row == self.removedPiece.row) {
        square.piece.piece = self.removedPiece.piece;
      } else if (square.column == self.lastMove.column && square.row == self.lastMove.row) {
        square.piece.piece = self.lastMove.piece;
      }
      $('#board-placement').empty();
      myGame.board.draw.boardHTML();
    });
    self.nextTurn();
  }

  document.body.addEventListener('click', function(theEvent) {
    if (theEvent.target.getAttribute('queen-castle')) {
      self.queenSide(self.currentPlayer.color);
    }
  });
  document.body.addEventListener('click', function(theEvent) {
    if (theEvent.target.getAttribute('king-castle')) {
      self.kingSide(self.currentPlayer.color);
    }
  });
  document.body.addEventListener('click', function(theEvent) {
    if (theEvent.target.getAttribute('data-unselect')) {
      $('.path').removeClass('path');
      self.currentPiece = {};
      self.moveSet = {};
      self.state = 'selecting';
    }
  });
  document.body.addEventListener('click', function(theEvent) {
    if (theEvent.target.getAttribute('undo-move')) {
      self.undoMove();
    }
  });

  this.movePiece = function(click) {
    var moveChoices;
    if (myGame.state == 'selecting') {
      if (myGame.currentPlayer.color === 'white') {
        if (white.kingCastle === true) {
          myGame.castleCheck(self.currentPlayer.color);
        } else if (white.queenCastle === true) {
          myGame.castleCheck(self.currentPlayer.color);
        }
      } else if (myGame.currentPlayer.color === 'black') {
        if (black.kingCastle === true) {
          myGame.castleCheck(self.currentPlayer.color);
        } else if (black.queenCastle === true) {
          myGame.castleCheck(self.currentPlayer.color);
        }
      }
      var coordinate = click.getAttribute('id').split(',');
      var row = coordinate[0];
      var column = coordinate[1];
      myGame.board.squares.forEach(function(square) {
        if (square.row == row && square.column == column) {
          if (square.piece.piece != undefined && square.piece.piece.color === self.currentPlayer.color) {
            myGame.state = 'moving';
            myGame.currentPiece = square.piece.piece;
            checkMoves(square);
            for (const placed of myGame.moveSet) {
              for (const move of placed) {
                var change = document.getElementById(move.row.toString() + ',' + move.column.toString());
                change.classList.add('path');
              }
            }
          }
        }
      });
    } else if (myGame.state == 'moving') {
      var coordinateMove = click.getAttribute('id').split(',');
      var rowMove = coordinateMove[0];
      var columnMove = coordinateMove[1];
      var remove = self.lastLocation.split(',');
      var rowRemove = remove[0];
      var columnRemove = remove[1];
      myGame.board.squares.forEach(function(square) {
        if (square.row == rowMove && square.column == columnMove) {
          self.moveSet.forEach(function(move) {
            move.forEach(function(legal) {
              // Undo move
              if (legal.column == columnMove && legal.row == rowMove) {
                if (square.piece.piece != undefined) {
                  self.removedPiece.piece = legal.piece.piece;
                } else {
                  self.removedPiece = {};
                }
                self.removedPiece.column = legal.column;
                self.removedPiece.row = legal.row;

                var split = self.lastLocation.split(',');
                self.lastMove.row = parseInt(split[0]);
                self.lastMove.column = parseInt(split[1]);
                self.lastMove.piece = myGame.currentPiece;
                //finish undo move
                square.piece.piece = myGame.currentPiece;
                myGame.board.squares.forEach(function(square) {
                  if (square.row == rowRemove && square.column == columnRemove) {
                    square.piece = {};
                  }
                });
                //Promote pawn
                myGame.checkPromotion(square.row, legal.piece.piece.color, legal.piece.piece.type);
                if (myGame.pawnPromotion === true) {
                  var promote = myGame.board.draw.promotePawn();
                  if (promote === 'queen' || promote === 'knight') {
                    myGame.givePromotion(coordinateMove, promote, myGame.currentPlayer.color)
                    myGame.pawnPromotion = false;
                  } else {
                    myGame.givePromotion(coordinateMove, 'queen', myGame.currentPlayer.color)
                    myGame.pawnPromotion = false;
                  }
                }
                $('.path').removeClass('path');
                $('#board-placement').empty();
                myGame.board.draw.boardHTML();
                myGame.nextTurn();
              }
            });
          });
        }
      });
    }
  }
}

var Player = function(name, color) {
  this.name = name;
  this.color = color;
  // Allows castling while true.
  this.kingCastle = true;
  this.queenCastle = true;
}
var white = new Player('Player 1', 'white');
var black = new Player('Player 2', 'black');
var myGame = new Game([white, black]);
myGame.start();

function checkMoves(square) {
  var moveSet = new MoveSets();
  if (square.piece.piece != undefined) {
    var color = square.piece.piece.color;
    var location = square.row + "," + square.column;
    myGame.lastLocation = location;
    switch (square.piece.piece.type) {
      case "pawn":
        var moves = moveSet.pawn(location, color);
        myGame.moveSet = pawnCollision(moves, location, color);
        break;
      case "rook":
        var moves = moveSet.rook(location);
        myGame.moveSet = collision(moves, location, color);
        break;
      case "knight":
        var moves = moveSet.knight(location);
        myGame.moveSet = knightCollision(moves, color);
        break;
      case "bishop":
        var moves = moveSet.bishop(location);
        myGame.moveSet = collision(moves, location, color);
        break;
      case "queen":
        var moves = moveSet.queen(location);
        myGame.moveSet = collision(moves, location, color);
        break;
      case "king":
        var moves = moveSet.king(location);
        myGame.moveSet = collision(moves, location, color);
        break;
    }
  }
}

function pawnCollision(possibleMoves, currentLocation, color) {
  var originalCoordinates = currentLocation.split(',');
  var row = originalCoordinates[0];
  var column = originalCoordinates[1];

  var legalMoves = [];
  var workingPawn = [];

  myGame.board.squares.forEach(function(square) {
    possibleMoves.forEach(function(move) {
      var coordinate = move.split(',');
      var x = parseInt(coordinate[0]);
      var y = parseInt(coordinate[1]);
      if (square.row === x && square.column === y) {
        if (square.piece.piece === undefined && square.column == column) {
          legalMoves.push(square);
        } else if (square.piece.piece !== undefined && square.piece.piece.color !== color && square.column != column) {
          legalMoves.push(square);
        }
      }
    });
  })
  workingPawn.push(legalMoves);
  return workingPawn;
}

function knightCollision(possibleMoves, color) {

  var legalMoves = [];
  var workingKnight = [];

  myGame.board.squares.forEach(function(square) {
    possibleMoves.forEach(function(move) {
      var coordinate = move.split(',');
      var x = parseInt(coordinate[0]);
      var y = parseInt(coordinate[1]);
      if (square.row === x && square.column === y) {
        if (square.piece.piece === undefined) {
          legalMoves.push(square);
        } else if (square.piece.piece.color !== color) {
          legalMoves.push(square);
        }
      }
    });
  })
  workingKnight.push(legalMoves);
  return workingKnight;
}

//Collision detection
function collision(possibleMoves, currentLocation, color) {
  currentCoordinate = currentLocation.split(',');
  var x1 = parseInt(currentCoordinate[0]);
  var y1 = parseInt(currentCoordinate[1]);
  var actualMoves = [];
  var xIncrease = [];
      xDecrease = [];
      yIncrease = [];
      yDecrease = [];
      bothIncrease = [];
      bothDecrease = [];
      xIncreaseYDecrease = [];
      xDecreaseYIncrease = [];

  possibleMoves.forEach(function(move) {
    var coordinate = move.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    myGame.board.squares.forEach(function(square) {
      if (square.row === x && square.column === y) {
        var distance = Math.sqrt(((x1 - x)*(x1 - x)) + ((y1 - y)*(y1 - y)));
        var testDistance = {};
        if ((x1 < x) && (y1 === y)) {
          testDistance.distance = distance;
          testDistance.square = square;
          xIncrease.push(testDistance);
        } else if (x1 === x && y1 < y) {
          testDistance.distance = distance;
          testDistance.square = square;
          yIncrease.push(testDistance);
        } else if (x1 > x && y1 === y) {
          testDistance.distance = distance;
          testDistance.square = square;
          xDecrease.push(testDistance);
        } else if (x1 === x && y1 > y) {
          testDistance.distance = distance;
          testDistance.square = square;
          yDecrease.push(testDistance);
        } else if (x1 < x && y1 < y) {
          testDistance.distance = distance;
          testDistance.square = square;
          bothIncrease.push(testDistance);
        } else if (x1 > x && y1 > y) {
          testDistance.distance = distance;
          testDistance.square = square;
          bothDecrease.push(testDistance);
        } else if (x1 < x && y1 > y) {
          testDistance.distance = distance;
          testDistance.square = square;
          xIncreaseYDecrease.push(testDistance);
        } else if (x1 > x && y1 < y) {
          testDistance.distance = distance;
          testDistance.square = square;
          xDecreaseYIncrease.push(testDistance);
        }
      }
    });
  });

  //Takes array of objects with squares in them and orders them by distance
  //from shortest distance to location to largest distance.
  var checkXIncrease = pathEnd(xIncrease);
  var checkXDecrease = pathEnd(xDecrease);
  var checkYIncrease = pathEnd(yIncrease);
  var checkYDecrease = pathEnd(yDecrease);
  var checkBothIncrease = pathEnd(bothIncrease);
  var checkBothDecrease = pathEnd(bothDecrease);
  var checkXIncreaseYDecrease = pathEnd(xIncreaseYDecrease);
  var checkXDecreaseYIncrease = pathEnd(xDecreaseYIncrease);

  actualMoves.push(getMoves(checkXIncrease, color));
  actualMoves.push(getMoves(checkXDecrease, color));
  actualMoves.push(getMoves(checkYIncrease, color));
  actualMoves.push(getMoves(checkYDecrease, color));
  actualMoves.push(getMoves(checkBothIncrease, color));
  actualMoves.push(getMoves(checkBothDecrease, color));
  actualMoves.push(getMoves(checkXIncreaseYDecrease, color));
  actualMoves.push(getMoves(checkXDecreaseYIncrease, color));

  return actualMoves;
}
//Function to check whether or not a space has an existing piece in it
//check color of piece in order to decide whether or not piece should be
//returned in array.
function getMoves(array, color) {
  var legalMoves = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i].square.piece.piece !== undefined) {
      if(array[i].square.piece.piece.color === color) {
        return legalMoves;
      } else {
        legalMoves.push(array[i].square);
        return legalMoves;
      }
    } else {
      legalMoves.push(array[i].square);
    }
  }
  return legalMoves;
}
// Orders the moves in the array from smallest to largest.
function pathEnd(array) {
  array.sort(function(a, b) {
    if (a.distance > b.distance) {
      return 1;
    } else if (a.distance < b.distance) {
      return -1;
    }
  });
  return array;
}

//Add to moveSets.
var MoveSets = function() {
  this.king = function(location) {
    var coordinate = location.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    var possibleMoves = [];
    for (var row = 0; row <= 7; row++) {
      for (var column = 0; column <= 7; column++) {
        if (row === x || row === x + 1 || row === x - 1) {
          if (column === y || column === y + 1 || column === y - 1) {
            var legal = row.toString() + ',' + column.toString();
            possibleMoves.push(legal);
          }
        }
      }
    }
    var remove = possibleMoves.indexOf(location);
    possibleMoves.splice(remove, 1);
    return possibleMoves;
  }
  this.rook = function(location) {
    var coordinate = location.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    var possibleMoves = [];
    for (var row = 0; row <= 7; row++) {
      for (var column = 0; column <= 7; column++) {
        var legal = row.toString() + ',' + column.toString();
        if (row === x) {
          possibleMoves.push(legal);
        } else if (column === y) {
          possibleMoves.push(legal);
        }
      }
    }
    var remove = possibleMoves.indexOf(location);
    possibleMoves.splice(remove, 1);
    return possibleMoves;
  }
  this.bishop = function(location) {
    var coordinate = location.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    var possibleMoves = [];
    for (var row = 0; row <= 7; row++) {
      for (var column = 0; column <= 7; column++) {
        var legal = row.toString() + ',' + column.toString();
        if (row - x === column - y) {
          possibleMoves.push(legal);
        } else if (column + row === y + x) {
          possibleMoves.push(legal);
        }
      }
    }
    var remove = possibleMoves.indexOf(location);
    possibleMoves.splice(remove, 1);
    return possibleMoves;
  }
  this.knight = function(location) {
    var coordinate = location.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    var possibleMoves = [];
    for (var row = 0; row <= 7; row++) {
      for (var column = 0; column <= 7; column++) {
        var legal = row.toString() + ',' + column.toString();
        if (x === row + 2 || x === row - 2) {
          if (y === column + 1 || y === column - 1) {
            possibleMoves.push(legal);
          }
        } else if (x === row + 1 || x === row - 1) {
          if (y === column + 2 || y === column - 2) {
            possibleMoves.push(legal);
          }
        }
      }
    }
    return possibleMoves;
  }
  this.queen = function(location) {
    var coordinate = location.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    var possibleMoves = [];
    for (var row = 0; row <= 7; row++) {
      for (var column = 0; column <= 7; column++) {
        var legal = row.toString() + ',' + column.toString();
        if (row - x === column - y) {
          possibleMoves.push(legal);
        } else if (column + row === y + x) {
          possibleMoves.push(legal);
        } else if (row === x) {
          possibleMoves.push(legal);
        } else if (column === y) {
          possibleMoves.push(legal);
        }
      }
    }
    var remove = possibleMoves.indexOf(location);
    possibleMoves.splice(remove, 1);
    return possibleMoves;
  }

  this.pawn = function(location, color) {
    var coordinate = location.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    var possibleMoves = [];
    for (var row = 0; row <= 7; row++) {
      for (var column = 0; column <= 7; column++) {
        var legal = row.toString() + ',' + column.toString();
        if ((row === x - 1) && color === 'white') {
          if (column === y || column === y + 1 || column === y - 1) {
              possibleMoves.push(legal);
          }
        } else if ((row === x + 1 ) && color === 'black') {
          if (column === y || column === y + 1 || column === y - 1) {
              possibleMoves.push(legal);
          }
        } else if ((row === x - 2) && (color === 'white') && x === 6) {
          if (column === y) {
            possibleMoves.push(legal);
          }
        } else if ((row === x + 2) && (color === 'black') && x === 1) {
          if (column === y) {
            possibleMoves.push(legal);
          }
        }
      }
    }
    return possibleMoves;
  }
}

var showGame = function() {
  var status = myGame.board.draw.statusHTML();
  var theStatus = document.getElementById('information');
  theStatus.innerHTML = "";
  theStatus.appendChild(status)
}
setInterval(showGame, 1000);
