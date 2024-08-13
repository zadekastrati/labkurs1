const Classroom = require("../models/classroom.model.js");

// Create a new classroom
async function createClassroom(req, res) {
  try {
    const { classroomName, location, capacity } = req.body;

    const classroom = await Classroom.create({
      classroomName,
      location,
      capacity,
    });

    res.status(201).json(classroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createClassroom = createClassroom;

// Retrieve all classrooms
async function getAllClassrooms(req, res) {
  try {
    const classrooms = await Classroom.findAll();
    res.status(200).json(classrooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllClassrooms = getAllClassrooms;

// Retrieve a single classroom by id
async function getClassroomById(req, res) {
  const id = req.params.id;
  try {
    const classroom = await Classroom.findByPk(id);
    if (!classroom) {
      res.status(404).json({ message: `Classroom with id ${id} not found` });
    } else {
      res.status(200).json(classroom);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getClassroomById = getClassroomById;

// Update a classroom by id
async function updateClassroom(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await Classroom.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Classroom with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateClassroom = updateClassroom;

// Delete a classroom by id
async function deleteClassroom(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Classroom.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Classroom with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteClassroom = deleteClassroom;
