const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "dna_nft",
  password: process.env.DB_PASSWORD || "test@1234",
  database: process.env.DB_NAME || "loginapp",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;
