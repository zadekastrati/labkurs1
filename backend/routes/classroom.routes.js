const express = require("express");
const ClassroomController = require("../controllers/classroom.controller.js");

const router = express.Router();

// Create a new classroom
router.post("/", ClassroomController.createClassroom);

// Retrieve all classrooms
router.get("/", ClassroomController.getAllClassrooms);

// Retrieve a single classroom by id
router.get("/:id", ClassroomController.getClassroomById);

// Update a classroom by id
router.put("/:id", ClassroomController.updateClassroom);

// Delete a classroom by id
router.delete("/:id", ClassroomController.deleteClassroom);

module.exports = router;
