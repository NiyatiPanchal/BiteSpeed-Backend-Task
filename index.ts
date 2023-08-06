import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
// import { User } from "./model/User";

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

// sequelize.addModels([User]);

// Sync the database
(async () => {
  await sequelize.sync({ force: true });
  console.log("Database synced!");
})();

app.listen(PORT, () => {
  console.log(`BiteSpeed-Backend-Task listening on port ${PORT}`);
});
