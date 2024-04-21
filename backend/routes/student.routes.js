const Course = require('../models/course.model.js');

// Create a new course
async function createCourse(req, res) {
  try {
    const { title, description, trainer_id } = req.body;

    const course = await Course.create({ title, description, trainer_id });

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createCourse = createCourse;

// Retrieve all courses
async function getAllCourses(req, res) {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllCourses = getAllCourses;

// Retrieve a single course by id
async function getCourseById(req, res) {
  const id = req.params.id;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ message: `Course with id ${id} not found` });
    } else {
      res.status(200).json(course);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getCourseById = getCourseById;

// Update a course by id
async function updateCourse(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await Course.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Course with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateCourse = updateCourse;

// Delete a course by id
async function deleteCourse(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Course.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Course with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteCourse = deleteCourse;
