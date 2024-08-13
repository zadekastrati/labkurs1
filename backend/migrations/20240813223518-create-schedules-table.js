"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("schedules", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      scheduleName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      classroomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "classrooms", // Name of the table that has the foreign key
          key: "id", // Key in the foreign table that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING, // New column for additional details
        allowNull: true, // Optional field
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("schedules");
  },
};
