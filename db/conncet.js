const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("loginapp", "dna_nft", "test@1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;
