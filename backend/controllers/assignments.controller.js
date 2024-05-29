const Course = require("../models/course.model.js");
const Assignment = require('../models/assignments.model.js');

// Create a new course with validation
async function createAssignment(req, res) {
  console.log(req.body);
  const { name, description, courseId } = req.body;
  if (!name || !description || !courseId) {
    return res.status(400).json({ message: 'All fields (name, description, courseId) are required.' });
  }

  try {
    // Check if the courseId exists in the categories table
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(400).json({ message: 'Invalid courseId' });
    }

    const assignment = await Assignment.create({ name, description, courseId });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: `Error creating course: ${err.message}` });
  }
}
exports.createAssignment = createAssignment;

// Other functions remain the same

// Retrieve all courses
async function getAllAssignments(req, res) {
  try {
    const assignment = await Assignment.findAll({
      include: Course
    });
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllAssignments = getAllAssignments;

// Retrieve a single course by id
async function getAssignmentById(req, res) {
  const id = req.params.id;
  try {
    const assignment = await Assignment.findByPk(id, {
      include: Course
    });
    if (!assignment) {
      res.status(404).json({ message: `Course with id ${id} not found.` });
    } else {
      res.status(200).json(assignment);
    }
  } catch (err) {
    res.status(500).json({ message: `Error finding course: ${err.message}` });
  }
}
exports.getAssignmentById = getAssignmentById;

// Update a course by id with validation
async function updateAssignment(req, res) {
  const id = req.params.id;
  const { name, description, courseId } = req.body;

  if (!name || !description || !courseId) {
    return res.status(400).json({ message: 'All fields (name, description, courseId) must be provided.' });
  }

  try {
    // Check if the categoryId exists in the categories table
    const course = await Course.findByPk(courseIdId);
    if (!course) {
      return res.status(400).json({ message: 'Invalid courseId' });
    }

    const [updatedRowsCount, updatedRows] = await Assignment.update(
      { name, description, courseId },
      { where: { id }, returning: true, plain: true }
    );

    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `No course found with id ${id}, or no changes made.` });
    } else {
      const updatedAssignment = await Assignment.findByPk(id, { include: Course });
      res.status(200).json(updatedAssignment);
    }
  } catch (err) {
    res.status(500).json({ message: `Error updating course: ${err.message}` });
  }
}
exports.updateAssignment = updateAssignment;

// Delete a course by id
async function deleteAssignment(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Assignment.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Course with id ${id} not found.` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: `Error deleting course: ${err.message}` });
  }
}
exports.deleteAssignment = deleteAssignment;
