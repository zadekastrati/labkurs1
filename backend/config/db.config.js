// db.config.js
const { Sequelize } = require('sequelize');

const db = new Sequelize('labkurs1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging SQL queries
});

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

module.exports = {
  jwtSecret: 'ecaf226b8e59e7783ad4dc1e9483e1b5',
};


module.exports = db;