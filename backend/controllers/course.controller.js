const Course = require('../models/course.model.js');

// Create a new course with validation
async function createCourse(req, res) {
  console.log(req.body);
  const { title, description} = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'All fields (title, description) are required.' });
  }

  try {
    const course = await Course.create({ title, description});
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: `Error creating course: ${err.message}` });
  }
}
exports.createCourse = createCourse;

// Retrieve all courses
async function getAllCourses(req, res) {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving courses: ${err.message}` });
  }
}
exports.getAllCourses = getAllCourses;

// Retrieve a single course by id
async function getCourseById(req, res) {
  const id = req.params.id;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ message: `Course with id ${id} not found.` });
    } else {
      res.status(200).json(course);
    }
  } catch (err) {
    res.status(500).json({ message: `Error finding course: ${err.message}` });
  }
}
exports.getCourseById = getCourseById;  

// Update a course by id with validation
async function updateCourse(req, res) {
  const id = req.params.id;
  const { title, description} = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'All fields (title, description) must be provided.' });
  }

  try {
    const [updatedRowsCount, updatedRows] = await Course.update(
      { title, description},
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `No course found with id ${id}, or no changes made.` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: `Error updating course: ${err.message}` });
  }
}
exports.updateCourse = updateCourse;

// Delete a course by id
async function deleteCourse(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Course.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Course with id ${id} not found.` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: `Error deleting course: ${err.message}` });
  }
}
exports.deleteCourse = deleteCourse;
