'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Todo = require('../models/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Main application controller which will take care of
// CRUD operations (in this case GET and PUT/POST for Todos)
var mainController = {
    // Compile index.html file in the Views directory
    getIndex: function getIndex(req, res) {
        res.render('index');
    },
    // Access Angular template
    getTemplate: function getTemplate(req, res) {
        res.render('templates/' + req.params.template);
    },
    // Get all the Todos in the collection and send back as JSON
    getAllTodos: function getAllTodos(req, res) {
        _Todo2.default.find({}, function (err, todos) {
            // Note to self: Callback from Todo.find()
            // Handle error if there is one
            if (err) {
                return res.send(err);
            }
            // Otherwise send the todos in JSON format
            res.json(todos);
        });
    },
    // Create a new Todo from a POST req
    postNewTodo: function postNewTodo(req, res) {
        _Todo2.default.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            // Note to self: Callback from Todo.create()
            // Handle error
            if (err) {
                return res.send(err);
            }
            // Get all todos by performing Todo.find() again ***
            // *** Come back to this later and see if we can optimize by
            // *** calling getAllTodos() to make this code more DRY
            _Todo2.default.find({}, function (err, todos) {
                // Handle error
                if (err) {
                    return res.send(err);
                }
                // Send back all todos in JSON format including the one just saved
                res.json(todos);
            });
        });
    },
    // Delete a todo
    deleteTodo: function deleteTodo(req, res) {
        // Find the todo to remove by its _id property
        _Todo2.default.remove({
            _id: req.params.id
        }, function (err, todo) {
            // Ok think I'm understanding how callbacks work in ES6 now
            // Handle error
            if (err) {
                return res.send(err);
            }
            // Get all todos by performing Todo.find() again (same as with postNewTodo) ***
            _Todo2.default.find({}, function (err, todos) {
                // Handle error
                if (err) {
                    return res.send(err);
                }
                // Send back all todos
                res.json(todos);
            });
        });
    }
};

// Export controller for use in other areas of the application
// Import Todo schema from models as a dependency
exports.default = mainController;