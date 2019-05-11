var Piece = require('./base.js');

class Knight extends Piece {
  constructor(color) {
    super(color);

    this.collision = (possibleMoves, location, game) => {
      var legalMoves = [];
      var workingKnight = [];

      game.board.squares.forEach((square) => {
        possibleMoves.forEach((move) => {
          var coordinate = move.split(',');
          var x = parseInt(coordinate[0]);
          var y = parseInt(coordinate[1]);
          if (square.row === x && square.column === y) {
            if (square.piece.piece === undefined) {
              legalMoves.push(square);
            } else if (square.piece.piece.color !== this.color) {
              legalMoves.push(square);
            }
          }
        });
      })
      workingKnight.push(legalMoves);
      return workingKnight;
    }

    this.moveSet = (location) => {
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
  }
}

module.exports = Knight;
