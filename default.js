var chessBoard = document.getElementById('board-placement');
var squared = [];

var WhitePlayer = function() {
  this.turn = function(state) {
    console.log(state);
    return state;
  }

  // this.move = function() {
  // }
}

var BlackPlayer = function() {
  this.turn = function(state) {
    return state;
  }
}

var whitePlayer = new WhitePlayer();
var blackPlayer = new BlackPlayer();
whitePlayer.turn('ready');
blackPlayer.turn('waiting');

var Square = function(position) {
  var position = document.getElementById(position);
  var self = this;

  this.piece = function() {
    if ($(position).hasClass('rook')) {
      position.addEventListener('click', function(e) {

      })
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
          $('#'+rows).append("<div id='" + rows + ',' + cols + "' class='grid col-xs-1 light square empty'></div>");
        } else if ((rows + cols) % 2 == 0 ) {
          $('#'+rows).append("<div id='" + rows + ',' + cols + "' class='grid col-xs-1 light square empty'></div>");
        } else {
          $('#'+rows).append("<div id='" + rows + ',' + cols + "' class='grid col-xs-1 dark square empty'></div>");
        }
      }
    }
  }
  this.get = function() {
    chessBoard.addEventListener('click', function(e) {
      var clicked = e.target;
      if ($(clicked).hasClass('rook')) {
        if ($(clicked).hasClass('0,0')) {
          rookA8.moves(clicked.id, 'black');
          console.log(clicked);
        } else if ($(clicked).hasClass('0,7')) {
          rookH8.moves(clicked.id, 'black');
          console.log(clicked);
        } else if ($(clicked).hasClass('7,7')) {
          rookH1.moves(clicked.id, 'white');
          console.log(clicked);
        } else if ($(clicked).hasClass('7,0')) {
          rookA1.moves(clicked.id, 'white');
          console.log(clicked);
        }
      } else {
        console.log('no');
      }
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
    $(place).addClass(startingPosition);
    $(place).removeClass('empty');
    $(place).addClass('rook');
    // var add = document.createElement('div');
    // add.innerHTML = appearance;
    // place.appendChild(add);
  }

  this.moves = function(position, color) {
    if (color === 'white') {
      var notColor = 'black';
    } else {
      var notColor = 'white'
    }
    var coordinates = position.split(',');
    var located = document.getElementById(position);
    var legalMovesX = []
    var removeX = [];

//problem with checkX and coordinate location needs to be fixed
    for (let u = 0; u < 8; u++) {
      var checkX = u.toString();
      if (coordinates[0] == u) {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            var first = i.toString();
            var second = j.toString();
            var getId = first + ',' + second;
            var check = document.getElementById(getId);
            if ($(check).hasClass('empty') && first == checkX) {
              //add to possible moves!!!!
              legalMovesX.push(check);
            } else if ($(check).hasClass('empty') != -1 && check.id != position && first == checkX && $(check).hasClass(color)) {
              //collision detection against other pieces
              removeX.push(legalMovesX.length);
            } else if ($(check).hasClass('empty') != -1 && check.id != position && first == checkX && $(check).hasClass(notColor)) {
              legalMovesX.push(check);
              removeX.push(legalMovesX.length);
            }
          }
        }
        legalMovesX.splice(removeX[0]);
      }
    }

    var legalMovesY = []
    var removeY = [];
    for (let p = 0; p < 8; p++) {
      var checkY = p.toString();
      if (coordinates[1] == p) {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            var first = i.toString();
            var second = j.toString();
            var getId = first + ',' + second;
            var check = document.getElementById(getId);
            if ($(check).hasClass('empty') && second == checkY) {
              //add to possible moves!!!!
              legalMovesY.push(check);
            } else if ($(check).hasClass('empty') != -1 && check.id != position && second == checkY && $(check).hasClass('black')) {
              //collision detection against other pieces
              removeY.push(legalMovesY.length);
            } else if ($(check).hasClass('empty') != -1 && check.id != position && second == checkY && $(check).hasClass('white')) {
              legalMovesY.push(check);
              removeY.push(legalMovesY.length);
            }
          }
        }
        legalMovesY.splice(removeY[0]);
      }
    }
    var legalMoves = legalMovesX.concat(legalMovesY);
    console.log(legalMoves);

    // switch(coordinates[0]) {
    //   case '0':
    //     for (let i = 0; i < 8; i++) {
    //       for (let j = 0; j < 8; j++) {
    //         var first = i.toString();
    //         var second = j.toString();
    //         var getId = first + ',' + second;
    //         var check = document.getElementById(getId);
    //         if ($(check).hasClass('empty') && first == '0') {
    //           //add to possible moves!!!!
    //           legalMovesX.push(check);
    //         } else if ($(check).hasClass('empty') != -1 && check.id != position && first == '0' && $(check).hasClass(color)) {
    //           //collision detection against other pieces
    //           removeX.push(legalMovesX.length);
    //         } else if ($(check).hasClass('empty') != -1 && check.id != position && first == '0' && $(check).hasClass(notColor)) {
    //           legalMovesX.push(check);
    //           removeX.push(legalMovesX.length);
    //         }
    //       }
    //     }
    //     legalMovesX.splice(removeX[0]);
    //     break;
    //
    //     case '7':
    //       for (let i = 0; i < 8; i++) {
    //         for (let j = 0; j < 8; j++) {
    //           var first = i.toString();
    //           var second = j.toString();
    //           var getId = first + ',' + second;
    //           var check = document.getElementById(getId);
    //           if ($(check).hasClass('empty') && first == '7') {
    //             //add to possible moves!!!!
    //             legalMovesX.push(check);
    //           } else if ($(check).hasClass('empty') != -1 && check.id != position && first == '7' && $(check).hasClass(color)) {
    //             //collision detection against other pieces
    //             removeX.push(legalMovesX.length);
    //           } else if ($(check).hasClass('empty') != -1 && check.id != position && first == '7' && $(check).hasClass(notColor)) {
    //             legalMovesX.push(check);
    //             removeX.push(legalMovesX.length);
    //           }
    //         }
    //       }
    //       legalMovesX.splice(removeX[0]);
    //       break;
    // }

    // switch(coordinates[1]) {
    //   case '0':
    //     for (let i = 0; i < 8; i++) {
    //       for (let j = 0; j < 8; j++) {
    //         var first = i.toString();
    //         var second = j.toString();
    //         var getId = first + ',' + second;
    //         var check = document.getElementById(getId);
    //         if ($(check).hasClass('empty') && second == '0') {
    //           //add to possible moves!!!!
    //           legalMovesY.push(check);
    //         } else if ($(check).hasClass('empty') != -1 && check.id != position && second == '0' && $(check).hasClass('black')) {
    //           //collision detection against other pieces
    //           removeY.push(legalMovesY.length);
    //         } else if ($(check).hasClass('empty') != -1 && check.id != position && second == '0' && $(check).hasClass('white')) {
    //           legalMovesY.push(check);
    //           removeY.push(legalMovesY.length);
    //         }
    //       }
    //     }
    //     legalMovesY.splice(removeY[0]);
    //     break;
    // }

    //all legal moves for the rook

    // located.addEventListener('click', function(e) {
    //   // var use = whitePlayer.turn();
    //   console.log(whitePlayer);
    // })

  }
}

//white rooks
var rookA1 = new Rook('7,0', '&#9814;', 'white');
var rookH1 = new Rook('7,7', '&#9814;', 'white');
rookH1.initialPosition();
rookA1.initialPosition();
//black rooks
var rookA8 = new Rook('0,0', '&#9820;', 'black');
var rookH8 = new Rook('0,7', '&#9820;', 'black');
var test = new Rook('0,3', '&#9814;', 'white');
test.initialPosition();
rookH8.initialPosition();
rookA8.initialPosition();
// rookA8.moves('0,0');
// rookH8.moves('0,7');

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
