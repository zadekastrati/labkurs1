const express = require('express');
const ExamResultsController = require('../controllers/examResults.controller');

const router = express.Router();

// Create a new exam result
router.post('/', ExamResultsController.createExamResult);

// Retrieve all exam results
router.get('/', ExamResultsController.getAllExamResults);

// Retrieve a single exam result by id
router.get('/:id', ExamResultsController.getExamResultById);

// Update an exam result by id
router.put('/:id', ExamResultsController.updateExamResult);

// Delete an exam result by id
router.delete('/:id', ExamResultsController.deleteExamResult);

module.exports = router;

