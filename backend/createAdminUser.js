// createAdminUser.js
const { db } = require("./config/db.config"); // Adjust the path as needed
const User = require("./models/user.model");
const Role = require("./models/roles.model");

async function createAdminUser() {
  try {
    // Synchronize the database
    await db.sync();

    // Check if the admin role exists
    let adminRole = await Role.findOne({ where: { title: "admin" } });
    if (!adminRole) {
      adminRole = await Role.create({ title: "admin" });
      console.log("Admin role created successfully.");
    } else {
      console.log("Admin role already exists.");
    }

      // Create the admin user
      const adminUser = await User.create({
        name: 'Erina Koxha',
        email: 'erina.koxha@gmail.com', // Use a different email address
        roleId: adminRole.id,
        password: 'Erina123.', // This will be hashed automatically by the model hooks
      });

    console.log("Admin user created successfully:", adminUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    // Optionally close the connection if necessary
    try {
      await db.close();
      console.log("Database connection closed.");
    } catch (error) {
      console.error('Error creating admin user:', error);
    } finally {
      db.close();
    }
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
