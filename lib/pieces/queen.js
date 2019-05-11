var Piece = require('./base.js');

class Queen extends Piece {
  constructor(color) {
    super(color);

    this.moveSet = (location) => {
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
  }
}

module.exports = Queen;
