import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
  }
);

sequelize.addModels([__dirname + "/models/"]);
