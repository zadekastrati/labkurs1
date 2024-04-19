import express from 'express';
import db from './config.js';  
const app = express();
const port = 8080;

app.get('/data', (req, res) => {
  db.query('SELECT * FROM students', (error, results) => {
    if (error) {
      return res.status(500).send('Error occurred: ' + error.message);
    }
    res.json(results);
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});