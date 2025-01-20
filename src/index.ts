import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import corsMiddleware from "./middlewares/corsMiddleware";
import rateLimiterMiddleware from "./middlewares/rateLimiter";
import { sequelize } from "./config/database";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(corsMiddleware);
app.use(rateLimiterMiddleware);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor: ", error);
    process.exit(1);
  }
};

startServer();
