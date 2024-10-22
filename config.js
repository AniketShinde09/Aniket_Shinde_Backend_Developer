const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Ensure environment variables are loaded

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected...');
  } catch (error) {
    console.error(`Error at config=>connection.js=>${error.message}`);
    process.exit(1); // Exit if there's an error
  }
}

module.exports = dbConnection; // Export the function
