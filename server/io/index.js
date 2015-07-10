'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function(server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function(Socket) {
        // Now have access to socket, wowzers!
        console.log('connected')
        Socket.on('comment', function(comment) {
            Socket.broadcast.emit('comment', comment)
        })
    });

    return io;

};