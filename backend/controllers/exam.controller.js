const Course = require("../models/course.model.js");
const Exam = require("../models/exam.model.js");

// Create a new course with validation
async function createExam(req, res) {
  console.log(req.body);
  const { name, courseId } = req.body;
  if (!name || !courseId) {
    return res
      .status(400)
      .json({
        message: "All fields (name, description, courseId) are required.",
      });
  }

  try {
    // Check if the courseId exists in the categories table
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    const exam = await Exam.create({ name, courseId });
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: `Error creating course: ${err.message}` });
  }
}
exports.createExam = createExam;

// Other functions remain the same

// Retrieve all courses
async function getAllExam(req, res) {
  try {
    const exam = await Exam.findAll({
      include: Course,
    });
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllExam = getAllExam;

// Retrieve a single course by id
async function getExamById(req, res) {
  const id = req.params.id;
  try {
    const exam = await Exam.findByPk(id, {
      include: Course,
    });
    if (!exam) {
      res.status(404).json({ message: `Course with id ${id} not found.` });
    } else {
      res.status(200).json(exam);
    }
  } catch (err) {
    res.status(500).json({ message: `Error finding course: ${err.message}` });
  }
}
exports.getExamById = getExamById;

// Update a course by id with validation
async function updateExam(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await Exam.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Exam with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateExam = updateExam;

// Delete a course by id
async function deleteExam(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Exam.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Exam with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteExam = deleteExam;
