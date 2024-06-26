// middleware/authenticateUser.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/db.config');
const User = require('../models/user.model');
const Role = require('../models/roles.model');

const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('No token provided'); // Console log
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id;

    const user = await User.findByPk(req.userId, {
      include: [Role],
    });

    if (!user) {
      console.log('User not found'); // Console log
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    req.userRole = user.Role.title;
    console.log('User:', user);  // Console log
    console.log('Role:', user.Role.title);  // Console log
    next();
  } catch (error) {
    console.log('Invalid token'); // Console log
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;
