const Exam = require("../models/exam.model.js");
const ExamResult = require("../models/examResult.model.js");

// Create a new exam result with validation
async function createExamResult(req, res) {
  console.log(req.body);
  const { score, studentId, examId } = req.body;
  if (!score || !studentId || !examId) {
    return res.status(400).json({ message: 'All fields (score, studentId, examId) are required.' });
  }

  try {
    // Check if the examId exists in the exams table
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      return res.status(400).json({ message: 'Invalid examId' });
    }

    const examResult = await ExamResult.create({ score, studentId, examId });
    res.status(201).json(examResult);
  } catch (err) {
    res.status(500).json({ message: `Error creating exam result: ${err.message}` });
  }
}
exports.createExamResult = createExamResult;

// Retrieve all exam results
async function getAllExamResults(req, res) {
  try {
    const examResults = await ExamResult.findAll({
      include: Exam
    });
    res.status(200).json(examResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllExamResults = getAllExamResults;

// Retrieve a single exam result by id
async function getExamResultById(req, res) {
  const id = req.params.id;
  try {
    const examResult = await ExamResult.findByPk(id, {
      include: Exam
    });
    if (!examResult) {
      res.status(404).json({ message: `Exam result with id ${id} not found.` });
    } else {
      res.status(200).json(examResult);
    }
  } catch (err) {
    res.status(500).json({ message: `Error finding exam result: ${err.message}` });
  }
}
exports.getExamResultById = getExamResultById;

// Update an exam result by id with validation
async function updateExamResult(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await ExamResult.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Exam result with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateExamResult = updateExamResult;

// Delete an exam result by id
async function deleteExamResult(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await ExamResult.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Exam result with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteExamResult = deleteExamResult;
