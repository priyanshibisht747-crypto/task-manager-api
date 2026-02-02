// Import packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const taskRoutes = require("./routes/taskRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("Mongo Error:", err);
    process.exit(1);
  });


// Routes
app.use("/api/tasks", taskRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

// Global Error Handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
