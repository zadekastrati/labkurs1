const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');
const bcrypt = require('bcrypt');

const Role = db.define('Role', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
}, {
});

module.exports = Role;
