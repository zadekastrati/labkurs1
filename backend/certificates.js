import express from 'express';
import { getAllCertificatesWithTrainers } from './controllers/certificate.controller.js';

const router = express.Router();

router.get('/certificates', getAllCertificatesWithTrainers);

export default router;