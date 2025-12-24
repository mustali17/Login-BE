const { Sequelize } = require("sequelize");
require("dotenv").config();

// 1. Get the URL from .env
const dbUrl = process.env.DATABASE_URL;
console.log("🚀 ~ conncet.js:6 ~ dbUrl:", dbUrl)

if (!dbUrl) {
  console.error("❌ DATABASE_URL is missing in .env file");
  process.exit(1);
}

// 2. Initialize Sequelize
const sequelize = new Sequelize(dbUrl, {
  dialect: "mysql",
  logging: false, // Set to console.log to see SQL queries
  dialectOptions: {
    // Railway requires SSL for public connections
    ssl: {
      require: true,
      rejectUnauthorized: false, // This fixes "Self-signed certificate" errors
    },
  },
});

// 3. Test Connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Railway MySQL successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
};

testConnection();

module.exports = sequelize;
