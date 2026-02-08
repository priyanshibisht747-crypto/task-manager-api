// Import express
const express = require("express");
const router = express.Router();

// Import Task model
const Task = require("../models/Task");

// Import authentication middleware
const authenticateToken = require("../middleware/authMiddleware");

/*
  Protect ALL task routes
  Only authenticated users can access tasks
*/
router.use(authenticateToken);

// --------------------------------------------------
// CREATE TASK (Authenticated User Only)
// --------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title,
      description,
      completed: completed ?? false,
      user: req.userId // ✅ SAFE & CORRECT
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --------------------------------------------------
// GET ALL TASKS (Only Logged-in User's Tasks)
// --------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const { completed, page = 1, limit = 10, sort } = req.query;

    const filter = { user: req.userId };

    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    const sortOption =
      sort === "title" ? { title: 1 } : { createdAt: -1 };

    const tasks = await Task.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// --------------------------------------------------
// GET SINGLE TASK (Only Owner Can View)
// --------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID" });
  }
});

// --------------------------------------------------
// UPDATE TASK (Only Owner Can Update)
// --------------------------------------------------
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --------------------------------------------------
// DELETE TASK (Only Owner Can Delete)
// --------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId // ✅ updated
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
