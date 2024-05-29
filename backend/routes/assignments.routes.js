const express = require('express');
const AssignmentController = require('../controllers/assignments.controller.js');

const router = express.Router();

// Create a new course
router.post('/', AssignmentController.createAssignment);

// Retrieve all courses
router.get('/',AssignmentController.getAllAssignments);

// Retrieve a single course by id
router.get('/:id', AssignmentController.getAssignmentById);

// Update a course by id
router.put('/:id', AssignmentController.updateAssignment);

// Delete a course by id
router.delete('/:id', AssignmentController.deleteAssignment);


module.exports = router;
