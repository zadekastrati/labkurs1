const express = require("express");
const RolesController = require("../controllers/roles.controller.js");

const router = express.Router();

// Create a new role
router.post("/", RolesController.createRole);

// Retrieve all roles
router.get("/", RolesController.getAllRoles);

// Retrieve a single role by id
router.get("/:id", RolesController.getRoleById);

// Update a role by id
router.put("/:id", RolesController.updateRole);

// Delete a role by id
router.delete("/:id", RolesController.deleteRole);

module.exports = router;
