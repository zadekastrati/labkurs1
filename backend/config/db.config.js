const { Sequelize } = require('sequelize');

const db = new Sequelize('labkurs1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging SQL queries
});

module.exports = db;
