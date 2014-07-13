/**
 * Node Server for the RESTful APIs for messages.
 * 
 * @module server.js
 */
var application_root = __dirname,
    express = require('express');

var app = express();

// Check for passed in port argument
port = process.argv[2] || 8090;

// NOTE: this is the newer version, no warning is displayed.
// Works with html but does not work with Postman for post operations.
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// NOTE: this is the older version.  Works with Postman and 
// html but displays worning when server starts.
//var bodyParser = require('body-parser');
//app.use(bodyParser());

// Loads index.html.  Location of static content.
app.use("/", express.static(__dirname));

// Database connection
var db = require('./server/config/db');
db.connect();

// Routing for REST APIs
var router = require('./server/routes/messages');
router.routes(app);

//
// Start the server
//
app.listen(port);
console.log('server is listening on port ' + port + '...');

