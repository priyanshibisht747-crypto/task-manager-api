// Import express
const express = require("express");
const router = express.Router();

// Import Task model
const Task = require("../models/Task");


// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET ALL TASKS (Filter + Pagination + Sort)
router.get("/", async (req, res) => {
  try {
    const { completed, page = 1, limit = 10, sort } = req.query;

    let filter = {};

    if (completed) {
      filter.completed = completed === "true";
    }

    let sortOption = {};
    if (sort === "title") {
      sortOption.title = 1;
    } else {
      sortOption.createdAt = -1; // newest first
    }

    const tasks = await Task.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET SINGLE TASK
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json(task);

  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});


// UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json(task);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// Export router
module.exports = router;
