const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');
const bcrypt = require('bcrypt');

const Trainer = db.define('Trainer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
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
  hooks: {
    beforeCreate: async (trainer) => {
      // Hash the password before creating the user
      const hashedPassword = await bcrypt.hash(trainer.password, 10);
      trainer.password = hashedPassword;
    },
  },
});

module.exports = Trainer;
