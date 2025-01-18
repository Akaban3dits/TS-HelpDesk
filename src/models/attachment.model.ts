import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import * as path from "path";
import { readdirSync } from "fs";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

const modelsPath = path.join(__dirname, "../models");

readdirSync(modelsPath)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(modelsPath, file)).default;
    if (model && typeof model.init === "function") {
      model.init(sequelize);
    }
  });

Object.values(sequelize.models).forEach((model: any) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

export default sequelize;
