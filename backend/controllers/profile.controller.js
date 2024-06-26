const Profile = require("../models/profile.model.js");

// Create a new profile
async function createProfile(req, res) {
  try {
    const { firstName, lastName, email } = req.body;

    const profile = await Profile.create({ firstName, lastName, email });

    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.createProfile = createProfile;

// Retrieve all profiles
async function getAllProfiles(req, res) {
  try {
    const profiles = await Profile.findAll();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllProfiles = getAllProfiles;

// Retrieve a single profile by id
async function getProfileById(req, res) {
  const id = req.params.id;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      res.status(404).json({ message: `Profile with id ${id} not found` });
    } else {
      res.status(200).json(profile);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getProfileById = getProfileById;

// Update a profile by id
async function updateProfile(req, res) {
  const id = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await Profile.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: `Profile with id ${id} not found` });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateProfile = updateProfile;

// Delete a profile by id
async function deleteProfile(req, res) {
  const id = req.params.id;
  try {
    const deletedRowCount = await Profile.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: `Profile with id ${id} not found` });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteProfile = deleteProfile;

