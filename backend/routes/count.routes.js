// routes/count.routes.js

const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const Trainer = require("../models/trainer.model.js");
const Student = require("../models/students.model.js");
const Course = require("../models/course.model.js");

// Endpoint to get counts data
router.get("/", async (req, res) => {
  try {
    const coursesCount = await Course.count();
    const trainersCount = await Trainer.count();
    const studentsCount = await Student.count();
    const usersCount = await User.count();

    res.json({
      courses: coursesCount,
      trainers: trainersCount,
      students: studentsCount,
      users: usersCount,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
