const { DataTypes } = require("sequelize");
const db = require("../config/db.config.js");

// Definoni modelin për Profile
const Profile = db.define(
  "Profile",
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Students', // Emri i tabelës së referencuar për studentët
        key: 'id' // Kolona e referencuar në tabelën e studentëve
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses', // Emri i tabelës së referencuar për kurset
        key: 'id' // Kolona e referencuar në tabelën e kurseve
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
      defaultValue: DataTypes.NOW,
    },
  },
  {}
);

module.exports = Profile;
