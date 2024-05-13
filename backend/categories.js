import express from 'express';
import { getCategories } from "./backend/categories.controller";

const router = express.Router();

// Route to get all categories
router.get("/categories", getCategories);

export default router;
