var app = require('../app'); //Require our app

app.set('port', process.env.PORT || 3000);


var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
  var io = require('socket.io').listen(server);
 
	io.sockets.on('connection', function (socket) {
	 	console.log('Socket.io connection established :' + socket);
	    socket.on('message', function (message) {
	        console.log("Got message: " + message);
	        io.sockets.emit('pageview', { 'url': message, for: 'everyone' });
	    });
	 	
	 	socket.on('disconnect', function(){
		    console.log('user disconnected');
		});
	});

});