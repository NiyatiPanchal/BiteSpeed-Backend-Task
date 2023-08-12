import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize-typescript";
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
  await sequelize.sync({ force: false });
  console.log("Database synced!");
})();

app.listen(PORT, () => {
  console.log(`BiteSpeed-Backend-Task listening on port ${PORT}`);
});
