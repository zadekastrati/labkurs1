const express = require('express');
const UserController = require('../controllers/user.controller.js');

const router = express.Router();

// Create a new user
router.post('/', UserController.createUser);

// Retrieve all users
router.get('/', UserController.getAllUsers);

// Retrieve a single user by id
router.get('/:id', UserController.getUserById);

// Update a user by id
router.put('/:id', UserController.updateUser);

// Delete a user by id
router.delete('/:id', UserController.deleteUser);

module.exports = router;
