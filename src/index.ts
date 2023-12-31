import express from "express";
import bodyParser from "body-parser";
import "reflect-metadata";
import dotenv from "dotenv";
import { identify } from "./controllers/identify";
import { sequelize } from "./db";

dotenv.config();

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(bodyParser.json());

// Available Routes
app.post("/identify", identify);

// Sync the database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced!");
  } catch (error) {
    console.log(error);
  }
})();

app.listen(PORT, () => {
  console.log(`BiteSpeed-Backend-Task listening on port ${PORT}`);
});
