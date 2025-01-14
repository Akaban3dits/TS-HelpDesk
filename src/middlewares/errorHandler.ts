import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

interface CustomError extends Error {
  statusCode?: number;
  errors?: any[];
  message: string;
}

const createLogsDirectory = () => {
  const logsDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
};

const getLogFileName = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return `error-${year}-${month}.log`;
};

const logErrorToFile = (err: CustomError) => {
  createLogsDirectory();

  const logMessage = `
    [${new Date().toISOString()}] Error: ${err.message}
    Status Code: ${err.statusCode || 500}
    Stack: ${err.stack || "No stack trace avaible"}
    -------------------------------------------------------
    `;

  const logFilePath = path.join(__dirname, "../logs", getLogFileName());
  fs.appendFileSync(logFilePath, logMessage);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> => {
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Algo salio mal. Intenta nuevamente más tarde.";

  logErrorToFile(err);

  if (err.errors) {
    return res.status(400).json({
      status: "error",
      message: "Errores de validación",
      errores: err.errors,
    });
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      status: "error",
      message: message,
      stack: err.stack,
    });
  }

  return res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

export default errorHandler;
