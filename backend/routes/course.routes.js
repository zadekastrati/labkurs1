const express = require('express');
const CourseController = require('../controllers/course.controller.js');

const router = express.Router();

// Create a new course
router.post('/', CourseController.createCourse);

// Retrieve all courses
router.get('/', CourseController.getAllCourses);

// Retrieve a single course by id
router.get('/:id', CourseController.getCourseById);

// Update a course by id
router.put('/:id', CourseController.updateCourse);

// Delete a course by id
router.delete('/:id', CourseController.deleteCourse);


module.exports = router;
