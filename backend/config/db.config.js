const { Sequelize } = require('sequelize');

const db = new Sequelize('labkurs1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging SQL queries
});

const jwtSecret = process.env.JWT_SECRET || 'ecaf226b8e59e7783ad4dc1e9483e1b5';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'b2b3e28d8a2e5e4e38f05d95a7b714c49db74d817d8d7b6dc519be869faa3066';
if (!jwtSecret || !refreshTokenSecret) {
  throw new Error('JWT secrets are not defined.');
}

module.exports = {
  db,
  jwtSecret,
  refreshTokenSecret
};
