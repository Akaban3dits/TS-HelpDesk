import express, { Application } from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import corsMiddleware from "./middlewares/corsMiddleware";
import rateLimiterMiddleware from "./middlewares/rateLimiter";

const app: Application = express();

//Middlewares
app.use(express.json());
app.use(morgan("dev")); //Registro de solicitudes
app.use(corsMiddleware);
app.use(rateLimiterMiddleware); // Limitar solicitudes por cada ip
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
