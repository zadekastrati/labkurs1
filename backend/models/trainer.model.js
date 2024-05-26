const { DataTypes } = require("sequelize");
const db = require("../config/db.config.js");

const Trainer = db.define("Trainer", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  trainersName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  specialization: {
    type: DataTypes.TEXT,
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
});

module.exports = Trainer;
