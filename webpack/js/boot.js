// Import dependencies
import {bootstrap} from 'angular2/platform/browser';
import {TodoComponent} from './TodoComponent';

// Set bootstrap to a variable
let boot = document.addEventListener('DOMContentLoaded', () => {
    bootstrap(TodoComponent);
});

// Expose boot so it can be required by webpack
module.exports = boot;