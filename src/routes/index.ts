import { Router } from "express";
import departmentRoutes from "./department.routes";
import typesRoutes from "./types.routes";

const router = Router();

router.use("/departments", departmentRoutes);
router.use("/types", typesRoutes);

export default router;
