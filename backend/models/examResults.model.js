const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config.js'); // Correct import
const Exam = require("./exam.model.js"); // Assuming you have the Exam model defined
const User = require("./user.model.js"); // Assuming you have the User model defined

const ExamResult = db.define('ExamResult', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // References the Users table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Exams', // References the Exams table
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
  tableName: 'examResults', // Explicitly specify the table name
});

// Define associations
ExamResult.belongsTo(Exam, { foreignKey: 'examId' });
ExamResult.belongsTo(User, { foreignKey: 'studentId' });

module.exports = ExamResult;
