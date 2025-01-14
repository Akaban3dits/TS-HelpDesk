import dotenv from "dotenv";
import * as path from "path";
import { readdirSync } from "fs";
import { Sequelize } from "sequelize-typescript";

dotenv.config();

const modelsPath = path.join(__dirname, "../models");
const models: any[] = [];

readdirSync(modelsPath)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts")
  .forEach((file) => {
    const model = require(path.join(modelsPath, file)).default;
    models.push(model);
  });

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

export default sequelize;
