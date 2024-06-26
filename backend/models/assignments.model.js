const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config.js'); // Correct import
const Course = require("./course.model.js"); // Ensure the correct path

const Assignment = db.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses', // Ensure this matches the table name in your database
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'assignments', // Explicitly specify the table name
});

Assignment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Assignment;
