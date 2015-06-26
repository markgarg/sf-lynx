var app = require('../app'); //Require our app

app.set('port', process.env.PORT || 3000);
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(app.get('port'));
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

// var io;
// var count;
// var server = app.listen(app.get('port'), function () {
// 	count = 0;
//   console.log('Express server listening on port ' + server.address().port);
//   io = require('socket.io').listen(server);
 
// 	io.sockets.on('connection', function (socket) {
// 	 	console.log('Socket.io connection established :' + socket);
//     socket.on('message', function (message) {
//         console.log("Got message: " + message);
//         io.sockets.emit('pageview', { 'url': message, for: 'everyone' });
//     });
	 	
// 	 	socket.on('disconnect', function(){
// 		    console.log('user disconnected');
// 		});

// 	});

// 	// we will use global authorization and reject all the cross-domain connection attempts
// 	/*io.configure(function () {
//     io.set('authorization', function (handshakeData, callback) {
//         if (handshakeData.xdomain) {
//             callback('Cross-domain connections are not allowed');
//         } else {
//             callback(null, true);
//         }
// 	    });
// 	});*/

// });

module.exports = io;