const Student = require('../models/student.model.js');

// Create a new student
async function createStudent(req, res) {
  try {
    const { firstName, lastName, city, age } = req.body;

    const student = await Student.create({ firstName, lastName, city, age });

    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createStudent = createStudent;

// Retrieve all students
async function getAllStudents(req, res) {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllStudents = getAllStudents;

// Retrieve a single student by id
async function getStudentById(req, res) {
  const id = req.params.id;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).json({ message: `Student with id ${id} not found` });
    } else {
      res.status(200).json(student);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getStudentById = getStudentById;

// Update a student by id
async function updateStudent(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await Student.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Student with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateStudent = updateStudent;

// Delete a student by id
async function deleteStudent(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Student.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Student with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteStudent = deleteStudent;

