const Role = require('../models/roles.model.js');

// Create a new role
async function createRole(req, res) {
  try {
    const { title } = req.body;

    const roles = await Role.create({ title });

    res.status(201).json(roles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createRole = createRole;

// Retrieve all roles
async function getAllRoles(req, res) {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllRoles = getAllRoles;

// Retrieve a single role by id
async function getRoleById(req, res) {
  const id = req.params.id;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      res.status(404).json({ message: `Role with id ${id} not found` });
    } else {
      res.status(200).json(role);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getRoleById = getRoleById;

// Update a role by id
async function updateRole(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await Role.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Role with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateRole = updateRole;

// Delete a role by id
async function deleteRole(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Role.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Role with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteRole = deleteRole;
