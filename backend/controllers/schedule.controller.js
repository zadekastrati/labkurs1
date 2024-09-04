const Schedule = require("../models/schedule.model.js"); // Import Schedule model
const Classroom = require("../models/classroom.model.js"); // Import Classroom model

// Create a new schedule
async function createSchedule(req, res) {
  try {
    const { scheduleName, classroomId, startTime, endTime } = req.body;

    // Check if classroomId exists in the Classrooms table
    const classroom = await Classroom.findByPk(classroomId);
    if (!classroom) {
      return res
        .status(400)
        .json({ message: `Classroom with id ${classroomId} does not exist` });
    }

    const schedule = await Schedule.create({
      scheduleName,
      classroomId,
      startTime,
      endTime,
    });
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createSchedule = createSchedule;

// Retrieve all schedules
async function getAllSchedules(req, res) {
  try {
    const schedules = await Schedule.findAll({
      include: Classroom, // Include Classroom details
    });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllSchedules = getAllSchedules;

// Retrieve a single schedule by id
async function getScheduleById(req, res) {
  const id = req.params.id;
  try {
    const schedule = await Schedule.findByPk(id, {
      include: Classroom, // Include Classroom details
    });
    if (!schedule) {
      res.status(404).json({ message: `Schedule with id ${id} not found` });
    } else {
      res.status(200).json(schedule);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getScheduleById = getScheduleById;

// Update a schedule by id
async function updateSchedule(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await Schedule.update(req.body, {
      where: { id },
      returning: true, // Adjust based on database support
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Schedule with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateSchedule = updateSchedule;

// Delete a schedule by id
async function deleteSchedule(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Schedule.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Schedule with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteSchedule = deleteSchedule;
