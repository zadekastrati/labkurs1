const express = require('express');
const StudentController = require('../controllers/student.controller.js');

const router = express.Router();

// Create a new student
router.post('/', StudentController.createStudent);

// Retrieve all students
router.get('/', StudentController.getAllStudents);

// Retrieve a single student by id
router.get('/:id', StudentController.getStudentById);

// Update a student by id
router.put('/:id', StudentController.updateStudent);

// Delete a student by id
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;
