var Piece = require('./base.js');

class King extends Piece {
  constructor(color) {
    super(color);

    this.moveSet = (location) => {
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
  }
}

module.exports = King;
