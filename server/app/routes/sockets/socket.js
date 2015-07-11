module.exports = function(socket) {
    socket.on('comment', function(comment) {
        console.log('this is the server')
        socket.broadcast.emit('comment', comment)
    })
}