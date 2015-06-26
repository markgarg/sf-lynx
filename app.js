// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES FOR OUR APP
// =============================================================================
// var router = express.Router();              // get an instance of the express Router
var logCalculator = require('./routes/log-calculator');
app.get('/', function (req, res) {
  logCalculator.displayLog(req, res);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('page-error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('page-error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

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

var streamingAPI = require('./routes/streaming-api-access');
streamingAPI.initializeStreamingAPI(io);