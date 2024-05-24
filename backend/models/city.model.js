const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const City = db.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more attributes as necessary
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = City;
