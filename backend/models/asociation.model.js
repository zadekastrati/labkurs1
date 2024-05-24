const db = require('../config/db.config');
const City = require('./city.model');
const Student = require('./student.model');

// Define associations
Student.belongsTo(City, { foreignKey: 'cityId', as: 'city' });
City.hasMany(Student, { foreignKey: 'cityId', as: 'students' });

module.exports = {
  City,
  Student,
  sequelize: db,
};
