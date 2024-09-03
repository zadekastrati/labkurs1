const express = require('express');
const ScholarshipController = require('../controllers/scholarships.controller.js');

const router = express.Router();

// Create a new Scholarship
router.post('/', ScholarshipController.createscholarship);

// Retrieve all Scholarships
router.get('/', ScholarshipController.getAllscholarships);

// Retrieve a single Scholarship by id
router.get('/:id', ScholarshipController.getscholarshipById);

// Update a Scholarship by id
router.put('/:id', ScholarshipController.updatescholarship);

// Delete a Scholarship by id
router.delete('/:id', ScholarshipController.deletescholarship);

module.exports = router;
