const express = require("express");
const cors = require("cors");
const {db} = require("./config/db.config");
const userRoutes = require("./routes/user.routes");
const rolesRoutes = require("./routes/roles.routes");
const courseRoutes = require("./routes/course.routes");
const trainerRoutes = require("./routes/trainer.routes");
const certificateRoutes = require("./routes/certificate.routes");
const studentsRoutes = require("./routes/students.routes");
const categoriesRoutes = require("./routes/categories.routes");
const cityRoutes = require("./routes/city.routes");
const authRoutes = require("./routes/auth.routes");
const assignmentRoutes = require("./routes/assignments.routes");
const countRoutes = require("./routes/count.routes");
const examRoutes = require("./routes/exam.routes");

const authenticateUser = require('./middleware/authenticateUser');
const roleMiddleware = require('./middleware/roleMiddleware');

// Initialize Express app
const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync database
db.sync()
  .then(() => console.log("Database connected and synced"))
  .catch((err) => console.error("Error connecting to database:", err));

// Public routes
app.use("/api/auth", authRoutes);

<<<<<<< HEAD

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
=======
// Apply authentication middleware for protected routes
app.use(authenticateUser);

// Protected routes
app.use('/api/users', roleMiddleware([4]), userRoutes);
app.use('/api/roles', roleMiddleware([4]), rolesRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/city', cityRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/counts", countRoutes);
app.use('/api/exam', examRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Coders Academy API!');
>>>>>>> d8a2b7053c1e486c948b3f8582982a17af4c29f8
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
