var socket = io();

$('form').submit(function() {
  socket.emit('chat message', $('#typed').val());
  $('#typed').val('');
  return false;
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
  updateScroll();
});

socket.on('moved', function() {
  $('#board-placement').empty();
  draw.boardHTML();
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

  this.promotePawn = function () {
    if (myGame.pawnPromotion === true) {
      var promotion = prompt('Enter "queen" or "knight" to be promoted.');
      return promotion;
    }
  }
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
        theRow.classList.add('row');
        for (var column = 0; column <= 7; column++) {
          myGame.board.squares.forEach(function(square) {
            if (square.row == row && square.column == column) {
              var theSquare = document.createElement('div');
              theSquare.classList.add('col-xs-1');
              theSquare.classList.add(square.color);
              theSquare.setAttribute('id', row + ',' + column);
              // Set the pieces.
              if (square.piece.piece === undefined) {
                theSquare.textContent = '';
              } else if (square.piece.piece.color) {
                var pieceType = square.piece.piece.color.concat(square.piece.piece.type);
                theSquare.innerHTML = sprite[pieceType];
              } else {
                theSquare.textContent = '';
              }
              theRow.appendChild(theSquare);
              $('#board-placement').append(theRow);
            }
          });
        }
      }
    });
  }

  this.statusHTML = function() {
    var status = document.createElement('div');
    var playerName = document.createElement('div');
    playerName.textContent = 'Player Name: ' + myGame.currentPlayer.name;
    var playerColor = document.createElement('div');
    playerColor.textContent = 'Player Color: ' + myGame.currentPlayer.color;
    var state = document.createElement('div');
    state.textContent = 'Player State: ' + myGame.state;
    if (myGame.currentPiece.piece !== undefined) {
      var piece = document.createElement('div');
      piece.textContent = 'Current Piece: ' + myGame.currentPiece.piece.color + " " + myGame.currentPiece.piece.type;
      status.appendChild(piece);
    }
    status.appendChild(playerName);
    status.appendChild(playerColor);
    status.appendChild(state)
    return status;
  }

  this.check = function(color) {
    window.alert(color + ' king is in check!');
    $('#board-placement').empty();
    draw.boardHTML();
  }

  // Piece selection and movement event listeners.
  $(document.body).on('click', function(theEvent) {
    var coordinates = theEvent.target.id.split(',');
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
            socket.emit('moved');
          }
        }
      });
    } else if (myGame.state == 'selecting'){
      request.done(function(msg) {
        myGame = msg;
        myGame.moveSet.forEach(function(spot) {
          spot.forEach(function(move) {
            var change = document.getElementById(move.row.toString() + ',' + move.column.toString());
            change.classList.add('path');
          });
        });
      });
    }
  });
  // Castling and unselecting button event listeners.
  $(document.body).on('click', function(theEvent) {
    if (theEvent.target.getAttribute('queen-castle')) {
      var request = $.ajax({
        method: 'GET',
        url: '/queen',
        dataType: 'json'
      }).done(function(msg) {
        myGame = msg;
        socket.emit('moved');
      });
    } else if (theEvent.target.getAttribute('king-castle')) {
      var request = $.ajax({
        method: 'GET',
        url: '/king',
        dataType: 'json'
      }).done(function(msg) {
        myGame = msg;
        socket.emit('moved');
      });
    } else if (theEvent.target.getAttribute('data-unselect')) {
      var request = $.ajax({
        method: 'GET',
        url: '/unselect',
        dataType: 'json'
      }).done(function(msg) {
        myGame = msg;
        socket.emit('moved');
      });
      $('.path').removeClass('path');
    } else if (theEvent.target.getAttribute('reset')) {
      var request = $.ajax({
        method: 'GET',
        url: '/reset',
        dataType: 'json'
      }).done(function(msg) {
        myGame = msg;
        socket.emit('moved');
      });
    }
  });
}

var draw = new DrawHTML();
draw.boardHTML();

// Shows information about the game.
var showGame = function() {
  var status = draw.statusHTML();
  $('#information').html('').append(status);
}
setInterval(showGame, 1000);
