const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Certificate = db.define('Certificate', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  studentsName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  courseType:{
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Certificate;