const express = require("express");
const RolesController = require("../controllers/roles.controller.js");
const roleMiddleware = require('../middleware/roleMiddleware.js');

const router = express.Router();

// Only admins can create, update, or delete roles
router.post('/add', roleMiddleware([4]), RolesController.createRole);
router.put('/:id', roleMiddleware([4]), RolesController.updateRole);
router.delete('/:id', roleMiddleware([4]), RolesController.deleteRole);

// Admin and other authorized roles can view roles
router.get('/', roleMiddleware([4]), RolesController.getAllRoles);
router.get('/:id', roleMiddleware([4]), RolesController.getRoleById);

module.exports = router;
