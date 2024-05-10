const Category = require('../models/categories.model.js'); // Ensure the path and file name are correct

// Create a new category
async function createCategory(req, res) {
    const { name, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: 'Category name is required.' });
    }

    try {
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: `Error creating category: ${err.message}` });
    }
}
exports.createCategory = createCategory;

// Retrieve all categories
async function getAllCategories(req, res) {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: `Error retrieving categories: ${err.message}` });
    }
}
exports.getAllCategories = getAllCategories;

// Retrieve a single category by id
async function getCategoryById(req, res) {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({ message: `Category with id ${id} not found` });
        } else {
            res.status(200).json(category);
        }
    } catch (err) {
        res.status(500).json({ message: `Error finding category: ${err.message}` });
    }
}
exports.getCategoryById = getCategoryById;

// Update a category by id
async function updateCategory(req, res) {
    const id = req.params.id;
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Category name is required.' });
    }

    try {
        const [updatedRowsCount, updatedRows] = await Category.update({ name, description }, {
            where: { id },
            returning: true,
        });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: `Category with id ${id} not found` });
        } else {
            res.status(200).json(updatedRows[0]);
        }
    } catch (err) {
        res.status(500).json({ message: `Error updating category: ${err.message}` });
    }
}
exports.updateCategory = updateCategory;

// Delete a category by id
async function deleteCategory(req, res) {
    const id = req.params.id;
    try {
        const deletedRowCount = await Category.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            res.status(404).json({ message: `Category with id ${id} not found` });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: `Error deleting category: ${err.message}` });
    }
}
exports.deleteCategory = deleteCategory;
