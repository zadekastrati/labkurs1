const express = require("express");
const db = require("./config/db.config.js");
const userRoutes = require("./routes/user.routes.js");

// Initialize Express app
const app = express();

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connect to database
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

// Define routes
app.use("/api/users", userRoutes);

app.get("/data", (req, res) => {
  db.query("SELECT * FROM students", (error, results) => {
    if (error) {
      return res.status(500).send("Error occurred: " + error.message);
    }
    res.json(results);
  });
});

// Set up a basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Coders Academy API!");
});

// Set the port for the server
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
