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
  this.moveSet = {};
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
  this.move =
  this.HTML = function() {
    var status = document.createElement('div');
    var playerName = document.createElement('div');
    playerName.textContent = 'Player Name: ' + this.currentPlayer.name;
    var playerColor = document.createElement('div');
    playerColor.textContent = 'Player Color: ' + this.currentPlayer.color;
    var state = document.createElement('div');
    state.textContent = 'Player State: ' + this.state;
    if (typeof this.currentPiece.piece != 'undefined') {
      var piece = document.createElement('div');
      piece.textContent = 'Current Piece: ' + this.currentPiece.piece.color + " " + this.currentPiece.piece.type;
      status.appendChild(piece);
    }
    status.appendChild(playerName);
    status.appendChild(playerColor);
    status.appendChild(state)
    return status;
  }
  document.body.addEventListener('click', function(theEvent) {
    if (theEvent.target.getAttribute('data-unselect')) {
      self.currentPiece = {};
      self.state = 'selecting'
    }
  });
  document.body.addEventListener('click', function(theEvent) {
    if (myGame.state == 'selecting') {
      var coordinate = theEvent.target.getAttribute('id').split(',');
      var row = coordinate[0];
      var column = coordinate[1];
      myGame.board.squares.forEach(function(square) {
        if (square.row == row && square.column == column) {
          if (square.piece.piece != undefined) {
            myGame.state = 'moving';
            myGame.currentPiece = square.piece;
            var moveSet = new MoveSets();
            switch (square.piece.piece.type) {
              case "pawn":
                console.log(moveSet.pawn(square.piece.position[0] + "," + square.piece.position[1], square.piece.piece.color));
                break;
              case "rook":
                console.log(moveSet.rook(square.piece.position[0] + "," + square.piece.position[1]));
                break;
              case "knight":
                console.log(moveSet.knight(square.piece.position[0] + "," + square.piece.position[1]));
                break;
              case "bishop":
                console.log(moveSet.bishop(square.piece.position[0] + "," + square.piece.position[1]));
                break;
              case "queen":
                console.log(moveSet.queen(square.piece.position[0] + "," + square.piece.position[1]));
                break;
              case "king":
                console.log(moveSet.king(square.piece.position[0] + "," + square.piece.position[1]));
                break;
            }
          }
        }
      });
    }
  });
  document.body.addEventListener('click', function(theEvent) {
    if (myGame.state == 'moving') {
    }
  });
}
var Player = function(name, color) {
  this.name = name;
  this.color = color;
}
var ron = new Player('Ron', 'white');
var zach = new Player('Zach', 'black')
var myGame = new Game([ron, zach]);
myGame.start();

//collision detection
function collision(possibleMoves, currentLocation, color) {
  currentCoordinate = currentLocation.split(',');
  var x1 = currentCoordinate[0];
  var y1 = currentCoordinate[1];
  var actualMoves = []; //populate with coordinates after getSmallest fx is run
  var xIncrease = [];
      xDecrease = [];
      yIncrease = [];
      yDecrease = [];
      bothIncrease = [];
      bothDecrease = [];
      xIncreaseYDecrease = [];
      xDecreaseYIncrease = [];
      xIncreaseDistance = [];
      xDecreaseDistance = [];
      yIncreaseDistance = [];
      yDecreaseDistance = [];
      bothIncreaseDistance = [];
      bothDecreaseDistance = [];
      xIncreaseYDecreaseDistance = [];
      xDecreaseYIncreaseDistance = [];

  possibleMoves.forEach(function(move) {
    var coordinate = move.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    myGame.board.squares.forEach(function(square) {
      if (square.piece.position[0] === x && square.piece.position[1] === y) {
        var distance = Math.sqrt(((x1 - x)(x1 - x)) + ((y1 - y)(y1 - y)));
        var testDistance = {};
        if (x1 < x && y1 === y) {
          testDistance.distance = distance;
          testDistance.square = square;
          xIncrease.push(testDistance);
          // xIncreaseDistance.push(distance);
        } else if (x1 === x && y1 < y) {
          testDistance.distance = distance;
          testDistance.square = square;
          yIncrease.push(testDistance);
          // yIncreaseDistance.push(distance);
        } else if (x1 > x && y1 === y) {
          testDistance.distance = distance;
          testDistance.square = square;
          xDecrease.push(testDistance);
          // xDecreaseDistance.push(distance);
        } else if (x1 === x && y1 > y) {
          testDistance.distance = distance;
          testDistance.square = square;
          yDecrease.push(testDistance);
          // yDecreaseDistance.push(distance);
        } else if (x1 < x && y1 < y) {
          testDistance.distance = distance;
          testDistance.square = square;
          bothIncrease.push(testDistance);
          // bothIncreaseDistance.push(distance);
        } else if (x1 > x && y1 > y) {
          testDistance.distance = distance;
          testDistance.square = square;
          bothDecrease.push(testDistance);
          // bothDecreaseDistance.push(distance);
        } else if (x1 < x && y1 > y) {
          testDistance.distance = distance;
          testDistance.square = square;
          xIncreaseYDecrease.push(testDistance);
          // xIncreaseYDecreaseDistance.push(distance);
        } else if (x1 > x && y1 < y) {
          testDistance.distance = distance;
          testDistance.square = square;
          xDecreaseYIncrease.push(testDistance);
          // xDecreaseYIncreaseDistance.push(distance);
        }
      }
    });
  });

  //Takes array of objects with squares in them and orders them by distance
  //from shortest distance to location to largest distance
  var checkXIncrease = pathEnd(xIncrease);
  var checkXDecrease = pathEnd(xDecrease);
  var checkYIncrease = pathEnd(yIncrease);
  var checkYDecrease = pathEnd(yDecrease);
  var checkBothIncrease = pathEnd(bothIncrease);
  var checkBothDecrease = pathEnd(bothDecrease);
  var checkXIncreaseYDecrease = pathEnd(xIncreaseYDecrease);
  var checkXDecreaseYIncrease = pathEnd(xDecreaseYIncrease);

  actualMoves.push(pathEnd(checkXIncrease));
  actualMoves.push(pathEnd(checkXDecrease));
  actualMoves.push(pathEnd(checkYIncrease));
  actualMoves.push(pathEnd(checkYDecrease));
  actualMoves.push(pathEnd(checkBothIncrease));
  actualMoves.push(pathEnd(checkBothDecrease));
  actualMoves.push(pathEnd(checkXIncreaseYDecrease));
  actualMoves.push(pathEnd(checkXDecreaseYIncrease));

  return actualMoves;
}

function getMoves(array, color) {
  var legalMoves = [];
  array.square.forEach(function(square) {
    if (square.piece.piece == undefined) {
      legalMoves.push(square);
    } else {
      if (square.piece.piece.color == color) {
        return false;
      } else {
        legalMoves.push(square);
        return true;
      }
    }
  });
  return legalMoves;
}

function pathEnd(array) {
  array.sort(function(a, b) {
    if (a.distance > b.distance) {
      return 1;
    } else if (a.distance < b.distance) {
      return -1;
    }
  })
  return array;
}
// // test getSmallest
// var test = [
//   {distance: 7},
//   {distance: 12},
//   {distance: 5}
// ];
// var output = pathEnd(test);
// console.log(output);

//get smallest number out of an array
//check if smallest distance has a piece on it, if not remove
//from array and add to actualMoves
//if so, check pieces color and whether it is legal or not to land on
//remove other pieces
// function getSmallest(array) {
//   Array.min = function(array) {
//     return Math.min.apply(Math, array);
//   }
//   var smallest = Array.min(array);
//   var indexDistance = array.indexOf(smallest);
//   return indexDistance;
// }



//add to moveSets
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

  //will have to be updated
  this.pawn = function(location, color) {
    var coordinate = location.split(',');
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    var possibleMoves = [];
    for (var row = 0; row <= 7; row++) {
      for (var column = 0; column <= 7; column++) {
        var legal = row.toString() + ',' + column.toString();
        if ((row === x - 1 || row === x - 2) && color === 'white') {
          if (column === y) {
              possibleMoves.push(legal);
          }
        } else if ((row === x + 1 || row === x + 2) && color === 'black') {
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
  var status = myGame.HTML();
  var theStatus = document.getElementById('information');
  theStatus.innerHTML = "";
  theStatus.appendChild(status)
}
setInterval(showGame, 1000);
