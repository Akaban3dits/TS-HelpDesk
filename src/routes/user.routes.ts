import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { getUsers } from "../controllers/userController";

const router = Router();

router.get("/", authMiddleware, getUsers);

export default router;
