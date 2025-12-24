const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./db/conncet");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables synced!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync db: " + err.message);
  });
