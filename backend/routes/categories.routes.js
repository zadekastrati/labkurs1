const express = require('express');
const CategoryController = require('../controllers/categories.controller.js');

const router = express.Router();

// Create a new category
router.post('/', CategoryController.createCategory);

// Retrieve all categories
router.get('/', CategoryController.getAllCategories);

// Retrieve a single category by id
router.get('/:id', CategoryController.getCategoryById);

// Update a category by id
router.put('/:id', CategoryController.updateCategory);

// Delete a category by id
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
