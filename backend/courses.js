import express from 'express';
import {getCourses} from "./backend/courses";

const router = express.Router();

router.get("/courses", getCourses)