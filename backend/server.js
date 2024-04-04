import express from 'express';
import db from './db.js';  // assuming the file is named db.js and is in the same directory

const app = express();
const port = 8080;

app.get('/data', (req, res) => {
  db.query('SELECT * FROM your_table_name', (error, results) => {
    if (error) {
      return res.status(500).send('Error occurred: ' + error.message);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
