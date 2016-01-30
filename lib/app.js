'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _main = require('./controllers/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Configure database
 */

// Connects to MongoDB

// File path utilities to make sure we're using the right type of slash (/ vs \)

// Allows for PUT and DELETE methods to be used in browsers where they are not supported

// Logs each server request to the console
_mongoose2.default.connect('mongodb://localhost:27017/todoDB', function (err, db) {
  console.log("connected correctly to server");
});
// Handle error - most likely that MongoDB isn't running

/** 
 * Import controllers
 */

// Wrapper for interacting with MongoDB

// Takes information from POST requests and puts it into an object
/**
 * Import dependencies
 */
_mongoose2.default.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Configure app
 */
// Set up express, port, and Jade
var app = (0, _express2.default)();
app.set('port', process.env.PORT || 3000);
app.set('views', _path2.default.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
// Set the static files directory - /public will be / on the frontend
app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));
// Log requests to the console
app.use((0, _morgan2.default)('dev'));
// Parse JSON data and put it into an object which we can access
app.use(_bodyParser2.default.json());
//  Allow PUT/DELETE compatibility
app.use((0, _methodOverride2.default)());

/** 
 * Configure routes
 */
app.get('/', _main2.default.getIndex);
app.get('/templates/:template', _main2.default.getTemplate);
app.get('/todos', _main2.default.getAllTodos);
app.post('/todos', _main2.default.postNewTodo);
app.delete('/todos/:id', _main2.default.deleteTodo);

/**
 * Start app
 */
app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port') + '!');
});