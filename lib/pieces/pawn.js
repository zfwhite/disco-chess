var Piece = require('./base.js');

class Pawn extends Piece {
  constructor(color) {
    super(color);

    this.collision = (possibleMoves, currentLocation, game) => {
      var originalCoordinates = currentLocation.split(',');
      var row = originalCoordinates[0];
      var column = originalCoordinates[1];

      var legalMoves = [];
      var workingPawn = [];

      game.board.squares.forEach((square) => {
        possibleMoves.forEach((move) => {
          var coordinate = move.split(',');
          var x = parseInt(coordinate[0]);
          var y = parseInt(coordinate[1]);
          if (square.row === x && square.column === y) {
            if (square.piece.piece === undefined && square.column == column) {
              legalMoves.push(square);
            } else if (square.piece.piece !== undefined && square.piece.piece.color !== this.color && square.column != column) {
              legalMoves.push(square);
            }
          }
        });
      })
      workingPawn.push(legalMoves);
      return workingPawn;
    }

    this.moveSet = (location) => {
      var coordinate = location.split(',');
      var x = parseInt(coordinate[0]);
      var y = parseInt(coordinate[1]);
      var possibleMoves = [];
      for (var row = 0; row <= 7; row++) {
        for (var column = 0; column <= 7; column++) {
          var legal = row.toString() + ',' + column.toString();
          if ((row === x - 1) && this.color === 'white') {
            if (column === y || column === y + 1 || column === y - 1) {
                possibleMoves.push(legal);
            }
          } else if ((row === x + 1 ) && this.color === 'black') {
            if (column === y || column === y + 1 || column === y - 1) {
                possibleMoves.push(legal);
            }
          } else if ((row === x - 2) && (this.color === 'white') && x === 6) {
            if (column === y) {
              possibleMoves.push(legal);
            }
          } else if ((row === x + 2) && (this.color === 'black') && x === 1) {
            if (column === y) {
              possibleMoves.push(legal);
            }
          }
        }
      }
      return possibleMoves;
    }
  }
}

module.exports = Pawn;
