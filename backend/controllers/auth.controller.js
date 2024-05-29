// controllers/auth.controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model"); // Import User model
const { db, jwtSecret } = require("../config/db.config"); // Import jwtSecret

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, 'ecaf226b8e59e7783ad4dc1e9483e1b5', { expiresIn: "24h" }); // Use jwtSecret here

    res.status(200).send({
      id: user.id,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};