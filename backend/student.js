import express from 'express';
import { getAllStudents } from "./backend/students.js";

const router = express.Router();

router.get("/students", getAllStudents);

export default router;
