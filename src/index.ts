import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import corsMiddleware from "./middlewares/corsMiddleware";
import rateLimiterMiddleware from "./middlewares/rateLimiter";
import { initializeDatabase } from "./config/database";  

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(corsMiddleware);
app.use(rateLimiterMiddleware);

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
    await initializeDatabase();
    console.log("Database and models initialized successfully.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
