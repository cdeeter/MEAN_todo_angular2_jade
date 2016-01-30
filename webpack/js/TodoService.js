// Wrapper for Angular2's HTTP function

// Import dependencies
import {Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

// TodoService Class
class TodoService {
    // Constructor function to create new object for when the class is instantiated
    constructor(http) {
        this.http = http;       // Set the instance of the main Http class that handles APIs
    }
    
    // Methods associated with this class:
    
    // Return the todos using the GET /todos API route (from app.js)
    getAllTodos() {
        return this.http.get('/todos').map((res) => {
            return JSON.parse(res._body);
        });
    }
    // Post a new Todo
    postNewTodo(data) {
        // Set content-type as application/json for the API call
        // so that data will be parsed by the bodyParser
        let headers = new Headers();
        heders.append('Content-Type', 'appliation/json');
        // Add the todo using the POST /todos API route (from app.js)
        return this.http.post('/todos', JSON.stringify(data), {
            headers: headers
        }).map((res) => {
            return JSON.parse(res._body);
        });
    }
    // Delete a todo
    deleteTodo(id) {
        // Remove a todo using the DELETE /todos/:id API route (from app.js)
        return this.http.delete('/todos/' + id).map((res) => {
            return JSON.parse(res._body);
        });
    }
}

// Inject Http each time a new instance of TodoService is created
TodoService.parameters = [new Inject(Http)];

export {TodoService}