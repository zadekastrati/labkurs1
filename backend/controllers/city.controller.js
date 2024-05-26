const City = require('../models/city.model.js');

// Create a new city
async function createCity(req, res) {
  try {
    const { name } = req.body;

    const city = await City.create({ name });

    res.status(201).json(city);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createCity = createCity;

// Retrieve all cities
async function getAllCities(req, res) {
  try {
    const cities = await City.findAll();
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllCities = getAllCities;

// Retrieve a single city by id
async function getCityById(req, res) {
  const id = req.params.id;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      res.status(404).json({ message: `City with id ${id} not found` });
    } else {
      res.status(200).json(city);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getCityById = getCityById;

// Update a city by id
async function updateCity(req, res) {
  const id = req.params.id;
  try {
    const { name } = req.body;
    const [updatedRowsCount, updatedRows] = await City.update({ name }, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `City with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateCity = updateCity;

// Delete a city by id
async function deleteCity(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await City.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `City with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteCity = deleteCity;
