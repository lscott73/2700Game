const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

  let players = [];

io.on('connection', function(socket) {
    console.log('a user connected: ' + socket.id);

    // create a new player and add it to our players array
    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    }

    socket.on('dealCards', function() {
        // tells all clients to deal cards
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function(gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function() {
    console.log('Server started! Listening on port 3000');
});