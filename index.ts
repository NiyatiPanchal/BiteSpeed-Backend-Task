import express from "express";
import bodyParser from "body-parser";
import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(bodyParser.json());

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.MYSQLDB!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

// Sync the database
(async () => {
  await sequelize.sync({ force: true });
  console.log("Database synced!");
})();

app.listen(PORT, () => {
  console.log(`BiteSpeed-Backend-Task listening on port ${PORT}`);
});
