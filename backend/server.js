const express = require("express");
const cors = require("cors");
const db = require("./config/db.config");
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
const countRoutes = require("./routes/count.routes"); // Add this line

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

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/city', cityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/counts", countRoutes); // Add this line

app.get('/', (req, res) => {
  res.send('Welcome to the Coders Academy API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
