// Import dependencies
import {Component, View} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {TodoService} from './TodoService';

// Set up component class
class TodoComponent {
    // Constructor function for when the class is instantiated (which depends on the todoService)
    constructor(TodoService) {
        this.todos = [];
        this.todoData = {
            text: ''
        };
        this.todoService = TodoService;     // Make the TodoService an attribute of the TodoComponent
        this.todoService.getAllTodos()
            .subscribe((res) => {           // Rxjs, we subscribe to the response
            this.todos = res;
        });
    }
    
    // Methods for this class:
    
    // Create a new Todo by sending the todoData from this class
    // to the method on the todoService
    createTodo() {
        this.todoService.postNewTodo(this.todoData)
            .subscribe((res) => {
            // The API will send back all todos in the response so reset them
            // and delete the text in the todoData input 
            this.todos = res;
            this.todoData.text = '';
        });
    }
    
    // Delete a Todo by sending the selected Todo id to the 
    // deleteTodo method on the todoService
    deleteTodo(id) {
        this.todoService.deleteTodo(id)
            .subscribe((res) => {
            // Again the API sends back all todos in the response so reset them
            this.todos = res;
        })
    }
};

// Class details
TodoComponent.annotations = [
    new Component({
        // CSS selector tag that represents this component in the DOM
        selector: 'todo-app',    
        // Class dependencies
        providers: [TodoService, HTTP_PROVIDERS]
    }),
    
    new View({
        // Template that will be shown in the DOM
        templateUrl: 'templates/TodoComponent'
    })
];

// Component parameters
TodoComponent.parameters = [[TodoService]];

// Export to be used in other parts of the app
export {TodoComponent};