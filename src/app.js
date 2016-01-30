/**
 * Import dependencies
 */
import express from 'express';
// Logs each server request to the console
import logger from 'morgan'; 
// Takes information from POST requests and puts it into an object
import bodyParser from 'body-parser'; 
// Allows for PUT and DELETE methods to be used in browsers where they are not supported
import methodOverride from 'method-override'; 
// Wrapper for interacting with MongoDB
import mongoose from 'mongoose'; 
// File path utilities to make sure we're using the right type of slash (/ vs \)
import path from 'path'; 

/** 
 * Import controllers
 */
import mainController from './controllers/main';

/**
 * Configure database
 */

// Connects to MongoDB
mongoose.connect('mongodb://localhost:27017/todoDB', function(err, db) {
    console.log("connected correctly to server");
});
// Handle error - most likely that MongoDB isn't running
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Configure app
 */
// Set up express, port, and Jade
let app = express(); 
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, '..', 'views')); 
app.set('view engine', 'jade'); 
// Set the static files directory - /public will be / on the frontend
app.use(express.static(path.join(__dirname, '..', 'public'))); 
// Log requests to the console
app.use(logger('dev')); 
// Parse JSON data and put it into an object which we can access
app.use(bodyParser.json());
//  Allow PUT/DELETE compatibility
app.use(methodOverride()); 

/** 
 * Configure routes
 */
app.get('/', mainController.getIndex);
app.get('/templates/:template', mainController.getTemplate);
app.get('/todos', mainController.getAllTodos);
app.post('/todos', mainController.postNewTodo);
app.delete('/todos/:id', mainController.deleteTodo);

/**
 * Start app
 */
app.listen(app.get('port'), function() {
  console.log(`App listening on port ${app.get('port')}!`);
});