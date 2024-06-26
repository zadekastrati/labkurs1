const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/db.config");

const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log('Failed to authenticate token', err);
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }

      const userRole = decoded.role;
      console.log('Decoded token:', decoded);
      console.log('User role:', userRole);
      console.log('Required roles:', requiredRoles);

      if (requiredRoles.includes(userRole)) {
        console.log('User role is authorized');
        req.user = decoded;
        next();
      } else {
        console.log('Access denied: User role is not authorized');
        return res.status(403).json({ message: 'Access denied' });
      }
    });
  };
};

module.exports = roleMiddleware;
