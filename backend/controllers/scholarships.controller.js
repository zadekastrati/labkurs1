const Category = require("../models/categories.model.js");
const scholarship = require("../models/scholarship.model.js");

// Create a new scholarship
async function createscholarship(req, res) {
  try {
    const { name, price, categoryId } = req.body;

    const scholarship = await scholarship.create({ name, price, categoryId });

    res.status(201).json(scholarship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createscholarship = createscholarship;

// Retrieve all scholarships
async function getAllscholarships(req, res) {
  try {
    const scholarships = await scholarship.findAll({
      include: Category
    });
    res.status(200).json(scholarships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllscholarships = getAllscholarships;

// Retrieve a single scholarship by id
async function getscholarshipById(req, res) {
  const id = req.params.id;
  try {
    const scholarship = await scholarship.findByPk(id);
    if (!scholarship) {
      res.status(404).json({ message: `scholarship with id ${id} not found` });
    } else {
      res.status(200).json(scholarship);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getscholarshipById = getscholarshipById;

// Update a scholarship by id
async function updatescholarship(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await scholarship.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `scholarship with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updatescholarship = updatescholarship;

// Delete a scholarship by id
async function deletescholarship(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await scholarship.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `scholarship with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deletescholarship = deletescholarship;
