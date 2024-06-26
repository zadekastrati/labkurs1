const express = require('express');
const ExamController = require('../controllers/exam.controller.js');

const router = express.Router();

// Create a new course
router.post('/', ExamController.createExam);

// Retrieve all courses
router.get('/',ExamController.getAllExam);

// Retrieve a single course by id
router.get('/:id', ExamController.getExamById);

// Update a course by id
router.put('/:id', ExamController.updateExam);

// Delete a course by id
router.delete('/:id', ExamController.deleteExam);


module.exports = router;
