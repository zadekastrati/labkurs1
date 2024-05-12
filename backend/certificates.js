import express from 'express';
import { getCertificates } from './backend/certificate.controller.js';

const router = express.Router();

router.get('/certificates', getCertificates);

export default router;