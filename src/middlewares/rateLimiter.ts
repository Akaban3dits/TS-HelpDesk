import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 1 * 60,
  keyPrefix: "rateLimiter",
});

const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.ip || "unknown-ip";
    await rateLimiter.consume(ip);
    next();
  } catch (rejRes) {
    res.status(429).json({
      error:
        "Hax excedido el numero de solicitudes permitidas. Intenta nuevamente más tarde.",
    });
  }
};

export default rateLimiterMiddleware;
