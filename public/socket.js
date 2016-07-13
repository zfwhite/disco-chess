var socket = io();

$('form').submit(function() {
  socket.emit('chat message', $('#typed').val());
  $('#typed').val('');
  return false;
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});
