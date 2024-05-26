const City = require("../models/city.model");
const Student = require("../models/students.model");

// Create a new student
async function createStudent(req, res) {
  try {
    const { firstName, lastName, cityId } = req.body;

    const student = await Student.create({ firstName, lastName, cityId });

    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createStudent = createStudent;

// Retrieve all students
async function getAllStudents(req, res) {
  try {
    const students = await Student.findAll({
      include: City
    });
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
    const student = await Student.findByPk(id, {
      include: City
    });
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
  const { firstName, lastName, cityId } = req.body;

  try {
    // Log the incoming request data
    console.log('Received update request for student:', { id, firstName, lastName, cityId });

    // Check if the student exists
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: `Student with id ${id} not found` });
    }

    // Perform the update operation
    const [updatedRowsCount, updatedRows] = await Student.update(
      { firstName, lastName, cityId },
      {
        where: { id },
        returning: true,
      }
    );

    // Log the result of the update operation
    console.log('Update operation result:', { updatedRowsCount, updatedRows });

    // Check if the update operation was successful
    if (updatedRowsCount === 0) {
      return res.status(500).json({ message: `Failed to update student with id ${id}` });
    }

    // Return the updated student
    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating student:', err);
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
