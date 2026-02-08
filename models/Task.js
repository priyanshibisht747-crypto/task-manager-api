// Import mongoose
const mongoose = require("mongoose");

/*
 TASK SCHEMA
 - title: task title
 - description: optional
 - completed: status
 - user: reference to logged-in user (OWNER)
*/

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    completed: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
