const express = require("express");
const db = require("./config/db.config.js");
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");
const rolesRoutes = require("./routes/roles.routes.js");
const courseRoutes = require("./routes/course.routes.js");
const trainerRoutes = require("./routes/trainer.routes.js");
const certificateRoutes = require("./routes/certificate.routes.js");
const studentsRoutes = require("./routes/students.routes.js");
const categoriesRoutes = require("./routes/categories.routes.js");
const cityRoutes = require("./routes/city.routes.js");

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
app.use("/api/certificates", certificateRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/city", cityRoutes);


// Endpoint to get counts
app.get('/api/counts', (req, res) => {
  const counts = {};

  const queries = [
    { table: 'courses', key: 'courses' },
    { table: 'trainers', key: 'trainers' },
    { table: 'students', key: 'students' },
    { table: 'users', key: 'users' }
  ];

  let completedQueries = 0;

  queries.forEach(query => {
    db.query(`SELECT COUNT(*) as count FROM ${query.table}`, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      counts[query.key] = result[0].count;
      completedQueries++;
      if (completedQueries === queries.length) {
        res.json(counts);
      }
    });
  });
});
// Set up a basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Coders Academy API!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
