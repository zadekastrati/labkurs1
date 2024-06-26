const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config.js'); // Correct import
const City = require("./city.model.js");

const Student = db.define('Student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cityId: {
    type: DataTypes.INTEGER,
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
  tableName: 'students', // Explicitly specify the table name if different
});

Student.belongsTo(City, { foreignKey: 'cityId' });

module.exports = Student;
