'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Schema for the Todo object
var todoSchema = new _mongoose2.default.Schema({
    text: String
});

// Expose the model to be imported and used in the controller
// Import Mongoose as a dependency
exports.default = _mongoose2.default.model('Todo', todoSchema);