const express = require("express");
const ScheduleController = require("../controllers/schedule.controller");

const router = express.Router();

// Create a new schedule
router.post("/", ScheduleController.createSchedule);

// Retrieve all schedules
router.get("/", ScheduleController.getAllSchedules);

// Retrieve a single schedule by id
router.get("/:id", ScheduleController.getScheduleById);

// Update a schedule by id
router.put("/:id", ScheduleController.updateSchedule);

// Delete a schedule by id
router.delete("/:id", ScheduleController.deleteSchedule);

module.exports = router;

