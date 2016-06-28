var chessBoard = document.getElementById('board-placement');
var squared = [];

var WhitePlayer = function() {
  this.turn = 'ready';

  // this.move = function() {
  // }
}

var BlackPlayer = function() {
  this.turn = 'waiting';
}

var Square = function(position) {
  var position = document.getElementById(position);
  var self = this;

  this.piece = function() {
    if ($(position).hasClass('rook')) {
      console.log('true');
    } else {
      console.log('false');
    }
  }

  this.show = function() {
    console.log(position.textContent);
  }
}

var Chess = function() {
  var self = this;
  this.draw = function() {
    for (var rows = 0; rows < 8; rows++) {
      $('#board-placement').append('<div id='+rows+' class=row></div>');
      for (var cols = 0; cols < 8; cols++) {
        if (rows + cols == 0) {
          $('#'+rows).append("<div id='" + rows + ',' + cols + "' class='grid col-xs-1 light square'></div>");
        } else if ((rows + cols) % 2 == 0 ) {
          $('#'+rows).append("<div id='" + rows + ',' + cols + "' class='grid col-xs-1 light square'></div>");
        } else {
          $('#'+rows).append("<div id='" + rows + ',' + cols + "' class='grid col-xs-1 dark square'></div>");
        }
      }
    }
  }
  this.get = function() {
    chessBoard.addEventListener('click', function(e) {
      console.log(e.target.id);
    });
  }
}

var board = new Chess();
board.draw();
board.get();

var Rook = function(startingPosition, appearance, color) {
  var self = this;
  this.initialPosition = function() {
    var place = document.getElementById(startingPosition);
    $(place).html(appearance);
    $(place).addClass(color);
    $(place).addClass('rook');
    // var add = document.createElement('div');
    // add.innerHTML = appearance;
    // place.appendChild(add);
  }

  // this.currentLocation = function() {
  //
  // }
  //
  // this.move() {
  //
  // }
}

//white rooks
var rookA1 = new Rook('7,0', '&#9814;', 'white');
var rookH1 = new Rook('7,7', '&#9814;', 'white');
rookH1.initialPosition();
rookA1.initialPosition();
//black rooks
var rookA8 = new Rook('0,0', '&#9820;', 'black');
var rookH8 = new Rook('0,7', '&#9820;', 'black');
rookH8.initialPosition();
rookA8.initialPosition();

//A
var a1 = new Square('7,0');
a1.show();
a1.piece();
var a2 = new Square('6,0');
var a3 = new Square('5,0');
var a4 = new Square('4,0');
var a5 = new Square('3,0');
var a6 = new Square('2,0');
var a7 = new Square('1,0');
var a8 = new Square('0,0');

//B
var b1 = new Square('7,1');
var b2 = new Square('6,1');
var b3 = new Square('5,1');
var b4 = new Square('4,1');
var b5 = new Square('3,1');
var b6 = new Square('2,1');
var b7 = new Square('1,1');
var b8 = new Square('0,1');

//C
var c1 = new Square('7,2');
var c2 = new Square('6,2');
var c3 = new Square('5,2');
var c4 = new Square('4,2');
var c5 = new Square('3,2');
var c6 = new Square('2,2');
var c7 = new Square('1,2');
var c8 = new Square('0,2');

//D
var d1 = new Square('7,3');
var d2 = new Square('6,3');
var d3 = new Square('5,3');
var d4 = new Square('4,3');
var d5 = new Square('3,3');
var d6 = new Square('2,3');
var d7 = new Square('1,3');
var d8 = new Square('0,3');

//E
var e1 = new Square('7,4');
var e2 = new Square('6,4');
var e3 = new Square('5,4');
var e4 = new Square('4,4');
var e5 = new Square('3,4');
var e6 = new Square('2,4');
var e7 = new Square('1,4');
var e8 = new Square('0,4');

//F
var f1 = new Square('7,5');
var f2 = new Square('6,5');
var f3 = new Square('5,5');
var f4 = new Square('4,5');
var f5 = new Square('3,5');
var f6 = new Square('2,5');
var f7 = new Square('1,5');
var f8 = new Square('0,5');

//G
var g1 = new Square('7,6');
var g2 = new Square('6,6');
var g3 = new Square('5,6');
var g4 = new Square('4,6');
var g5 = new Square('3,6');
var g6 = new Square('2,6');
var g7 = new Square('1,6');
var g8 = new Square('0,6');

//H
var h1 = new Square('7,7');
var h2 = new Square('6,7');
var h3 = new Square('5,7');
var h4 = new Square('4,7');
var h5 = new Square('3,7');
var h6 = new Square('2,7');
var h7 = new Square('1,7');
var h8 = new Square('0,7');
