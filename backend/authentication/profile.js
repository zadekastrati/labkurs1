// authentication.js
const jwt = require('jsonwebtoken');
const config = require('./config'); // Lidhje me konfigurimin për çelësat e JWT
const authenticate = require('../middleware/authenticate'); // Importimi i middleware

module.exports = (req, res, next) => {
    // Merr tokenin nga headeri 'Authorization'
    const token = req.header('Authorization');

    // Kontrollo nëse tokeni është i pranueshëm
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verifikimi i tokenit
        const decoded = jwt.verify(token, config.jwtSecret);

        // Vendos përdoruesin e dekoduar në request object
        req.user = decoded;

        // Vazhdo me ekzekutimin e rutes
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
