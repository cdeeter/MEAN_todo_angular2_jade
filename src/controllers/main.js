// Import Todo schema from models as a dependency
import Todo from '../models/Todo';

// Main application controller which will take care of 
// CRUD operations (in this case GET and PUT/POST for Todos)
let mainController = {
    // Compile index.html file in the Views directory
    getIndex: (req, res) => {
        res.render('index');
    },
    // Access Angular template
    getTemplate: (req, res) => {
        res.render('templates/' + req.params.template);
    },
    // Get all the Todos in the collection and send back as JSON
    getAllTodos: (req, res) => {
        Todo.find({}, (err, todos) => {             // Note to self: Callback from Todo.find()
            // Handle error if there is one
            if (err) {
                return res.send(err);
            }
            // Otherwise send the todos in JSON format
            res.json(todos);
        });
    },
    // Create a new Todo from a POST req
    postNewTodo: (req, res) => {
        Todo.create({
            text: req.body.text,
            done: false
        }, (err, todo) => {                         // Note to self: Callback from Todo.create()
            // Handle error 
            if (err) {
                return res.send(err);
            }
            // Get all todos by performing Todo.find() again ***
            // *** Come back to this later and see if we can optimize by
            // *** calling getAllTodos() to make this code more DRY
            Todo.find({}, (err, todos) => {
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
    deleteTodo: (req, res) => {
        // Find the todo to remove by its _id property
        Todo.remove({
            _id: req.params.id
        }, (err, todo) => {                // Ok think I'm understanding how callbacks work in ES6 now
            // Handle error
            if (err) {
                return res.send(err);
            }
            // Get all todos by performing Todo.find() again (same as with postNewTodo) ***
            Todo.find({}, (err, todos) => {
                // Handle error
                if (err) {
                    return res.send(err);
                }
                // Send back all todos
                res.json(todos);
            });
        });
    }
}

// Export controller for use in other areas of the application
export default mainController;