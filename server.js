// Import packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes"); //  NEW

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
app.use("/api/auth", authRoutes);   //  NEW (register & login)
app.use("/api/tasks", taskRoutes);  //  already protected via middleware

// Test route
app.get("/", (req, res) => {
  res.send("Secure Task Manager API Running");
});

// Global Error Handling

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  res.status(500).json({ error: "Internal Server Error" });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
