class Piece {
  constructor(color) {
    this.color = color;
    this.type = this.constructor.name.toLowerCase();

    this.availableMoves = (location, game) => this.collision(this.moveSet(location), location, game);

    //Collision detection
    this.collision = (possibleMoves, currentLocation, game, ...args) => {
      var currentCoordinate = currentLocation.split(',');
      var x1 = parseInt(currentCoordinate[0]);
      var y1 = parseInt(currentCoordinate[1]);
      var actualMoves = [];
      var xIncrease = [],
          xDecrease = [],
          yIncrease = [],
          yDecrease = [],
          bothIncrease = [],
          bothDecrease = [],
          xIncreaseYDecrease = [],
          xDecreaseYIncrease = [];

      possibleMoves.forEach(function(move) {
        var coordinate = move.split(',');
        var x = parseInt(coordinate[0]);
        var y = parseInt(coordinate[1]);
        game.board.squares.forEach(function(square) {
          if (square.row === x && square.column === y) {
            var distance = Math.sqrt(((x1 - x)*(x1 - x)) + ((y1 - y)*(y1 - y)));
            var testDistance = {};
            testDistance.distance = distance;
            testDistance.square = square;
            if ((x1 < x) && (y1 === y)) {
              xIncrease.push(testDistance);
            } else if (x1 === x && y1 < y) {
              yIncrease.push(testDistance);
            } else if (x1 > x && y1 === y) {
              xDecrease.push(testDistance);
            } else if (x1 === x && y1 > y) {
              yDecrease.push(testDistance);
            } else if (x1 < x && y1 < y) {
              bothIncrease.push(testDistance);
            } else if (x1 > x && y1 > y) {
              bothDecrease.push(testDistance);
            } else if (x1 < x && y1 > y) {
              xIncreaseYDecrease.push(testDistance);
            } else if (x1 > x && y1 < y) {
              xDecreaseYIncrease.push(testDistance);
            }
          }
        });
      });

      //Takes array of objects with squares in them and orders them by distance
      //from shortest distance to location to largest distance.
      var checkXIncrease = this.pathEnd(xIncrease);
      var checkXDecrease = this.pathEnd(xDecrease);
      var checkYIncrease = this.pathEnd(yIncrease);
      var checkYDecrease = this.pathEnd(yDecrease);
      var checkBothIncrease = this.pathEnd(bothIncrease);
      var checkBothDecrease = this.pathEnd(bothDecrease);
      var checkXIncreaseYDecrease = this.pathEnd(xIncreaseYDecrease);
      var checkXDecreaseYIncrease = this.pathEnd(xDecreaseYIncrease);

      actualMoves.push(this.getMoves(checkXIncrease));
      actualMoves.push(this.getMoves(checkXDecrease));
      actualMoves.push(this.getMoves(checkYIncrease));
      actualMoves.push(this.getMoves(checkYDecrease));
      actualMoves.push(this.getMoves(checkBothIncrease));
      actualMoves.push(this.getMoves(checkBothDecrease));
      actualMoves.push(this.getMoves(checkXIncreaseYDecrease));
      actualMoves.push(this.getMoves(checkXDecreaseYIncrease));

      return actualMoves;
    }

    this.getMoves = (array) => {
      var legalMoves = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i].square.piece.piece !== undefined) {
          if(array[i].square.piece.piece.color === this.color) {
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
    this.pathEnd = (array) => {
      array.sort(function(a, b) {
        if (a.distance > b.distance) {
          return 1;
        } else if (a.distance < b.distance) {
          return -1;
        }
      });
      return array;
    }
  }
}

module.exports = Piece;
