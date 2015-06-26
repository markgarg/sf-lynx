var localio;
module.exports = function(io){
	localio = io;
	io.on('connection', function (socket) {
	 	console.log('Socket.io connection established :' + socket);
	    socket.on('message', function (message) {
	        console.log("Got message: " + message);
	        socket.emit('pageview', { 'url': message, for: 'everyone' });
	    });
	 	
	 	socket.on('disconnect', function(){
		    console.log('user disconnected');
		});

	});

	// We will use global authorization and reject all the cross-domain connection attempts
	/*io.configure(function () {
    io.set('authorization', function (handshakeData, callback) {
        if (handshakeData.xdomain) {
            callback('Cross-domain connections are not allowed');
        } else {
            callback(null, true);
        }
	    });
	});*/

}

exports.sendToGraph = function(count){
	console.log('io :' + JSON.stringify(localio));
	localio.emit('count', {
     	number: count
    });
}