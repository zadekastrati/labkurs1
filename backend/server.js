const express = require("express");
const db = require("./config/db.config.js");
<<<<<<< HEAD
const cors = require('cors');
=======
const cors = require("cors");
>>>>>>> 2d1ff460b9cd5f791f4c73dd501513ccd6c0768d
const userRoutes = require("./routes/user.routes.js");
const rolesRoutes = require("./routes/roles.routes.js");
const courseRoutes = require("./routes/course.routes.js");
const trainerRoutes = require("./routes/trainer.routes.js");
const studentCoursesRoutes = require("./routes/student_course.routes.js");

// Initialize Express app
const app = express();
const port = 8080;

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Connect to database
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/student", studentCoursesRoutes);

// app.get("/data", (req, res) => {
//   db.query("SELECT * FROM students", (error, results) => {
//     if (error) {
//       return res.status(500).send("Error occurred: " + error.message);
//     }
//     res.json(results);
//   });
// });

// Set up a basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Coders Academy API!");
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
