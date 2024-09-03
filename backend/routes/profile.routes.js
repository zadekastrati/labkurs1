const express = require("express");
const ProfilesController = require("../controllers/profiles.controller.js");

const router = express.Router();

// Create a new profile
router.post("/", ProfilesController.createProfile);

// Retrieve all profiles
router.get("/", ProfilesController.getAllProfiles);

// Retrieve a single profile by id
router.get("/:id", ProfilesController.getProfileById);

// Update a profile by id
router.put("/:id", ProfilesController.updateProfile);

// Delete a profile by id
router.delete("/:id", ProfilesController.deleteProfile);

module.exports = router;

