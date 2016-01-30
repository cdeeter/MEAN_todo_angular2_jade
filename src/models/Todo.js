// Import Mongoose as a dependency
import mongoose from 'mongoose';

// Schema for the Todo object
let todoSchema = new mongoose.Schema({
    text: String
});

// Expose the model to be imported and used in the controller
export default mongoose.model('Todo', todoSchema);