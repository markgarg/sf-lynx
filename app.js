// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR APP
// =============================================================================
// var router = express.Router();              // get an instance of the express Router

app.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our app!'});
});

// more routes

module.exports = app;