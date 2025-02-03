import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: "Error interno del servidor" });
};

export default errorHandler;
