import express from 'express';
import { getAllStudents } from "./backend/student.js";

const router = express.Router();

router.get("/students", getAllStudents);

export default router;
