const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { jwtSecret, refreshTokenSecret } = require('../config/db.config');

// Ensure these values are defined
if (!jwtSecret || !refreshTokenSecret) {
  throw new Error('JWT secret keys are not defined.');
}

// Generate an access token with a short lifespan
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.roleId }, jwtSecret, { expiresIn: '15m' });
};

// Generate a refresh token with a longer lifespan
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, role: user.roleId }, refreshTokenSecret, { expiresIn: '7d' });
};

// Login function to authenticate user and provide tokens
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save the refresh token in the database
    await user.update({ refreshToken });

    // Send the refresh token as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });

    res.status(200).send({
      id: user.id,
      email: user.email,
      token: accessToken,
      role: user.roleId,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Refresh token function to provide a new access token
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).send({ message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);
    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).send({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    res.status(200).send({ token: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(403).send({ message: 'Invalid refresh token' });
  }
};
