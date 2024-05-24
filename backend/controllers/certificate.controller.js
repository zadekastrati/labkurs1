const Certificate = require('../models/certificate.model.js');

// Create a new certificate
async function createCertificate(req, res) {
    try {
        const { id, title, studentsName, courseType, date } = req.body;
        const certificate = await Certificate.create({ id, title, studentsName, courseType, date });
        res.status(201).json(certificate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
exports.createCertificate = createCertificate;

// Retrieve all certificates
async function getAllCertificates(req, res) {
    try {
        const certificates = await Certificate.findAll();
        res.status(200).json(certificates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getAllCertificates = getAllCertificates;

// Retrieve a single certificate by id
async function getCertificateById(req, res) {
    const id = req.params.id;
    try {
        const certificate = await Certificate.findByPk(id);
        if (!certificate) {
            res.status(404).json({ message: `Certificate with id ${id} not found` });
        } else {
            res.status(200).json(certificate);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getCertificateById = getCertificateById;

// Update a certificate by id
async function updateCertificate(req, res) {
    const id = req.params.id;
    try {
       
        const [updatedRowsCount, updatedRows] = await Certificate.update(req.body, {
            where: { id },
            returning: true,
        });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: `Certificate with id ${id} not found` });
        } else {
            res.status(200).json(updatedRows[0]);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.updateCertificate = updateCertificate;

// Delete a certificate by id
async function deleteCertificate(req, res) {
    const id = req.params.id;
    try {
        const deletedRowCount = await Certificate.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            res.status(404).json({ message: `Certificate with id ${id} not found` });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.deleteCertificate = deleteCertificate;