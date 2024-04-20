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
// Middleware for parsing request bodies
// app.use(express.json());

// // CREATE Course
// app.post('/courses', (req, res) => {
//   const { title, description, trainer_id } = req.body;
//   const query = 'INSERT INTO courses (title, description, trainer_id) VALUES (?, ?, ?)';
//   db.query(query, [title, description, trainer_id], (error, results) => {
//     if (error) {
//       return res.status(500).send('Error occurred: ' + error.message);
//     }
//     res.status(201).json({ id: results.insertId, title, description, trainer_id });
//   });
// });

// // READ all Courses
// app.get('/courses', (req, res) => {
//   db.query('SELECT * FROM courses', (error, results) => {
//     if (error) {
//       return res.status(500).send('Error occurred: ' + error.message);
//     }
//     res.json(results);
//   });
// });

// // UPDATE Course
// app.put('/courses/:id', (req, res) => {
//   const { title, description, trainer_id } = req.body;
//   const query = 'UPDATE courses SET title = ?, description = ?, trainer_id = ? WHERE id = ?';
//   db.query(query, [title, description, trainer_id, req.params.id], (error, results) => {
//     if (error) {
//       return res.status(500).send('Error occurred: ' + error.message);
//     }
//     res.json({ message: 'Course updated successfully' });
//   });
// });

// // DELETE Course
// app.delete('/courses/:id', (req, res) => {
//   const query = 'DELETE FROM courses WHERE id = ?';
//   db.query(query, [req.params.id], (error, results) => {
//     if (error) {
//       return res.status(500).send('Error occurred: ' + error.message);
//     }
//     res.json({ message: 'Course deleted successfully' });
//   });
// });
