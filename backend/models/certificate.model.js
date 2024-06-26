const { DataTypes } = require("sequelize");
const { db } = require("../config/db.config.js"); // Correct import
const Trainer = require("./trainer.model.js");

const Certificate = db.define("Certificate", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  trainerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Trainers', // Ensure this matches the table name in your database
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  trainersName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentsName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
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
  tableName: 'certificates', // Explicitly specify the table name if different
});

Certificate.belongsTo(Trainer, { foreignKey: "trainerId" });

module.exports = Certificate;
