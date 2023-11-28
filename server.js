const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
  
io.on('connection', function(socket) {
    console.log('a user connected: ' + socket.id);

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.id);
    });
});

http.listen(3000, function() {
    console.log('Server started! Listening on port 3000');
});