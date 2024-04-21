const express = require('express');
const StudentCourseController = require('../controllers/student_course.controller.js');

const router = express.Router();

// Create a new course
router.post('/:student_id/courses', StudentCourseController.registerStudent);

// Retrieve all courses
router.get('/:student_id/courses', StudentCourseController.getAllStudentCourses);

// Retrieve a single course by id
// router.get('/:id', StudentCourseController.getCourseById);

// // Update a course by id
// router.put('/:id', StudentCourseController.updateCourse);

// // Delete a course by id
// router.delete('/:id', StudentCourseController.deleteCourse);

module.exports = router;
