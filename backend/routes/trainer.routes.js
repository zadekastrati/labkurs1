const express = require("express");
const TrainerController = require("../controllers/trainer.controller.js");

const router = express.Router();

// Create a new trainer
router.post("/", TrainerController.createTrainer);

// Retrieve all trainers
router.get("/", TrainerController.getAllTrainers);

// Retrieve a single trainer by id
router.get("/:id", TrainerController.getTrainerById);

// Update a trainer by id
router.put("/:id", TrainerController.updateTrainer);

// Delete a trainer by id
router.delete("/:id", TrainerController.deleteTrainer);

module.exports = router;
