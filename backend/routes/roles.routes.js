const express = require("express");
const RolesController = require("../controllers/roles.controller.js");
const roleMiddleware = require('../middleware/roleMiddleware.js');

const router = express.Router();

router.post('/add', roleMiddleware([4]), RolesController.createRole);
router.put('/:id', roleMiddleware([4]), RolesController.updateRole);
router.delete('/:id', roleMiddleware([4]), RolesController.deleteRole);

router.get('/', roleMiddleware([4]), RolesController.getAllRoles);
router.get('/:id', roleMiddleware([4]), RolesController.getRoleById);

router.post('/', RolesController.createRole);

// Update a user by id
router.put('/:id', RolesController.updateRole);

module.exports = router;
