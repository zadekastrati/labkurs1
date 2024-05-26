const express = require("express");
const CertificateController = require("../controllers/certificate.controller.js");

const router = express.Router();

// Create a new certificate
router.post("/", CertificateController.createCertificate);

// Retrieve all certificates
router.get("/", CertificateController.getAllCertificates);

// Retrieve a single certificate by id
router.get("/:id", CertificateController.getCertificateById);

// Update a certificate by id
router.put("/:id", CertificateController.updateCertificate);

// Delete a certificate by id
router.delete("/:id", CertificateController.deleteCertificate);

module.exports = router;
