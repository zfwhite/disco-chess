var socket = io();

// Chat feature.
$('form').submit(function() {
  socket.emit('chat message', $('#typed').val());
  $('#typed').val('');
  return false;
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
  updateScroll();
});

socket.on('moved', function(board) {
  draw.updateBoard(board);
});

function updateScroll() {
  var chat = document.getElementById('messages');
  chat.scrollTop = chat.scrollHeight;
}

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
var myGame;
var DrawHTML = function() {
  var self = this;

  this.boardHTML = function() {
    var request = $.ajax({
      url: '/draw',
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json'
    }).done(function(msg) {
      myGame = msg;
      for (var row = 0; row <= 7; row++) {
        var theRow = document.createElement('div');
        $(theRow).addClass('row');
        for (var column = 0; column <= 7; column++) {
          myGame.board.squares.forEach(function(square) {
            if (square.row == row && square.column == column) {
              var theSquare = document.createElement('div');
              $(theSquare).addClass('col-xs-1');
              $(theSquare).addClass(square.color);
              theSquare.setAttribute('id', row + ',' + column);
              // Set the pieces.
              if (square.piece.piece === undefined) {
                $(theSquare).text('');
              } else if (square.piece.piece.color) {
                var pieceType = square.piece.piece.color.concat(square.piece.piece.type);
                $(theSquare).html(sprite[pieceType]);
              } else {
                $(theSquare).text('');
              }
              $(theRow).append(theSquare)
              $('#board-placement').append(theRow);
            }
          });
        }
      }
    });
  }

  this.updateBoard = function(game) {
    game.board.squares.forEach(function(square) {
      var id = square.row.toString() + ',' + square.column.toString();
      var updatedSquare = document.getElementById(id);
        if (square.piece.piece === undefined) {
          $(updatedSquare).text('');
        } else if (square.piece.piece.color) {
          var pieceType = square.piece.piece.color.concat(square.piece.piece.type);
          $(updatedSquare).html(sprite[pieceType]);
        } else {
          $(updatedSquare).text('');
        }
    });
  }

  this.statusHTML = function() {
    var status = document.createElement('div');
    var playerName = document.createElement('div');
    $(playerName).text('Player Name: ' + myGame.currentPlayer.name);
    var playerColor = document.createElement('div');
    $(playerColor).text('Player Color: ' + myGame.currentPlayer.color);
    var state = document.createElement('div');
    $(state).text('Player State: ' + myGame.state);
    $(status).append(playerName, playerColor, state);
    return status;
  }

  this.check = function(color) {
    window.alert(color + ' king is in check!');
    draw.updateBoard();
  }

  // Piece selection and movement event listeners.
  $(document.body).on('click', function(theEvent) {
    var click = theEvent.target.id;
    var coordinates = click.split(',');
    var id = parseInt(coordinates[0]) + ',' + parseInt(coordinates[1]);
    var request = $.ajax({
      url: '/moving',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({id})
    });
    if(myGame.state == 'moving') {
      request.done(function(msg) {
        myGame = msg;
        if ($(theEvent.target).hasClass('path')) {
          $('.path').removeClass('path');
          if (myGame.kingCheck === true) {
            self.check(myGame.currentPlayer.color);
          } else {
            socket.emit('moved', myGame);
          }
        }
      });
      // else if (myGame.lastMove.piece.type === 'pawn' && myGame.lastMove.piece.color === 'white' && (click == '0,0' || click == '0,1' || click == '0,2' || click == '0,3' || click == '0,4' || click == '0,5' || click == '0,6' || click == '0,7')) {
      //     pawnPromotion('white', click);
      //     socket.emit('moved');
      //   }
    } else if (myGame.state == 'selecting'){
      request.done(function(msg) {
        myGame = msg;
        myGame.moveSet.forEach(function(spot) {
          spot.forEach(function(move) {
            var change = document.getElementById(move.row.toString() + ',' + move.column.toString());
            $(change).addClass('path');
          });
        });
      });
    }
  });
  // Castling and unselecting button event listeners.
  $(document.body).on('click', function(theEvent) {
    var path;
    if (theEvent.target.getAttribute('queen-castle')) {
      path = '/queen';
    } else if (theEvent.target.getAttribute('king-castle')) {
      path = '/king';
    } else if (theEvent.target.getAttribute('data-unselect')) {
      path = '/unselect';
      $('.path').removeClass('path');
    } else if (theEvent.target.getAttribute('reset')) {
      path = '/reset';
    }
    var request = $.ajax({
      method: 'GET',
      url: path,
      dataType: 'json'
    }).done(function(msg) {
      myGame = msg;
      socket.emit('moved', myGame);
    });
  });
}

function pawnPromotion(color, location) {
  if (color === 'white') {
    var promote = window.prompt('Would you like a queen or a knight?');
    var promotion = {promote, location, color};
    var request = $.ajax({
      url: '/promotion',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({promotion})
    });
  }
}

var draw = new DrawHTML();
draw.boardHTML();
// Shows information about the game.
var showGame = function() {
  var status = draw.statusHTML();
  $('#information').html('').append(status);
}
setInterval(showGame, 1000);
