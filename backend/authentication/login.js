import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 8080;

import connection from '../config.js';

// Handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to check user credentials
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      return res.status(500).send('Error occurred: ' + error.message);
    }

    // If user exists and credentials match
    if (results.length > 0) {
      const user = results[0];
      // Save user login details to the database
      pool.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [user.username, user.email, user.password, user.role], (error) => {
        if (error) {
          return res.status(500).send('Error occurred while saving user data: ' + error.message);
        }
        res.json({ message: 'User data saved successfully' });
      });
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
});