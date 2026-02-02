// Import mongoose
const mongoose = require("mongoose");

// Create Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export Task model
module.exports = mongoose.model("Task", taskSchema);
