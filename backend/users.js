import express from 'express';
import {getUsers} from "./backend/users";

const router = express.Router();

router.get("/users", getUsers)