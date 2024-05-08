const Trainer = require('../models/trainer.models.js');

// Create a new trainer
async function createTrainer(req, res) {
    try {
        const { user_id, name, specialization } = req.body;
        const trainer = await Trainer.create({ user_id, name, specialization });
        res.status(201).json(trainer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
exports.createTrainer = createTrainer;

// Retrieve all trainers
async function getAllTrainers(req, res) {
    try {
        const trainers = await Trainer.findAll();
        res.status(200).json(trainers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getAllTrainers = getAllTrainers;

// Retrieve a single trainer by id
async function getTrainerById(req, res) {
    const id = req.params.id;
    try {
        const trainer = await Trainer.findByPk(id);
        if (!trainer) {
            res.status(404).json({ message: `Trainer with id ${id} not found` });
        } else {
            res.status(200).json(trainer);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getTrainerById = getTrainerById;

// Update a trainer by id
async function updateTrainer(req, res) {
    const id = req.params.id;
    try {
        const { name, specialization } = req.body;
        const [updatedRowsCount, updatedRows] = await Trainer.update({ name, specialization }, {
            where: { id },
            returning: true,
        });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: `Trainer with id ${id} not found` });
        } else {
            res.status(200).json(updatedRows[0]);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.updateTrainer = updateTrainer;

// Delete a trainer by id
async function deleteTrainer(req, res) {
    const id = req.params.id;
    try {
        const deletedRowCount = await Trainer.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            res.status(404).json({ message: `Trainer with id ${id} not found` });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.deleteTrainer = deleteTrainer;