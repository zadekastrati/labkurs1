const Role = require("../models/roles.model.js");
const User = require("../models/user.model.js");

// Create a new user
async function createUser(req, res) {
  try {
    const { name, email, roleId, password } = req.body;

    const user = await User.create({ name, email, roleId, password });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createUser = createUser;

// Retrieve all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      include: Role
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllUsers = getAllUsers;

// Retrieve a single user by id
async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getUserById = getUserById;

// Update a user by id
async function updateUser(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateUser = updateUser;

// Delete a user by id
async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await User.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteUser = deleteUser;
