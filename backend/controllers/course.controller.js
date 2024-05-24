const Category = require("../models/categories.model.js");
const Course = require('../models/course.model.js');

// Create a new course with validation
async function createCourse(req, res) {
  console.log(req.body);
  const { title, description, categoryId } = req.body;
  if (!title || !description || !categoryId) {
    return res.status(400).json({ message: 'All fields (title, description, categoryId) are required.' });
  }

  try {
    // Check if the categoryId exists in the categories table
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid categoryId' });
    }

    const course = await Course.create({ title, description, categoryId });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: `Error creating course: ${err.message}` });
  }
}
exports.createCourse = createCourse;

// Other functions remain the same

// Retrieve all courses
async function getAllCourses(req, res) {
  try {
    const courses = await Course.findAll({
      include: Category
    });
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
    const course = await Course.findByPk(id, {
      include: Category
    });
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
  const { title, description, categoryId } = req.body;

  if (!title || !description || !categoryId) {
    return res.status(400).json({ message: 'All fields (title, description, categoryId) must be provided.' });
  }

  try {
    // Check if the categoryId exists in the categories table
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid categoryId' });
    }

    const [updatedRowsCount, updatedRows] = await Course.update(
      { title, description, categoryId },
      { where: { id }, returning: true, plain: true }
    );

    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `No course found with id ${id}, or no changes made.` });
    } else {
      const updatedCourse = await Course.findByPk(id, { include: Category });
      res.status(200).json(updatedCourse);
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
