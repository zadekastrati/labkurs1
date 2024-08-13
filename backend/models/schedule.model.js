const { DataTypes } = require("sequelize");
const { db } = require("../config/db.config.js"); // Correct import
const Classroom = require("./classroom.model.js"); // Import Classroom model

const Schedule = db.define("Schedule", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  scheduleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classroomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Classrooms', // Ensure this matches the table name in your database
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
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
  tableName: 'schedules', // Explicitly specify the table name if different
});

Schedule.belongsTo(Classroom, { foreignKey: "classroomId" });

module.exports = Schedule;
