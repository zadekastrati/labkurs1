const express = require("express");
const CityController = require("../controllers/city.controller.js");

const router = express.Router();

// Create a new city
router.post("/", CityController.createCity);

// Retrieve all cities
router.get("/", CityController.getAllCities);

// Retrieve a single city by id
router.get("/:id", CityController.getCityById);

// Update a city by id
router.put("/:id", CityController.updateCity);

// Delete a city by id
router.delete("/:id", CityController.deleteCity);

module.exports = router;
