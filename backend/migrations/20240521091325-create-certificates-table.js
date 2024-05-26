"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("certificates", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      trainerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "trainers", // Name of the table that has the foreign key
          key: "id", // Key in the foreign table that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      trainersName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      studentsName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      courseType: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("certificates");
  },
};
