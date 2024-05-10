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
// DELETE a course by id
router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleteCount = await Course.destroy({
        where: { id }
      });
      if (deleteCount > 0) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).send({ message: 'Course not found' });
      }
    } catch (err) {
      res.status(500).send({ message: `Error deleting course: ${err.message}` });
    }
  });
  

module.exports = router;
