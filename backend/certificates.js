import express from "express";
import { getCertificates } from "./backend/certificates";

const router = express.Router();

router.get("/certificates", getCertificates);
