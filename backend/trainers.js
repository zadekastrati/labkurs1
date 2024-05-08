import express from 'express';
import { getTrainers } from "./backend/trainers";

const router = express.Router();

router.get("/trainers", getTrainers);