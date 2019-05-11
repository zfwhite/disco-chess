class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    // Allows castling while true.
    this.kingCastle = true;
    this.queenCastle = true;
  }
}

module.exports = Player;
