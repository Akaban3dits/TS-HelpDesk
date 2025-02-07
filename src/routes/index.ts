import { Router } from "express";
import userRoutes from "./user.routes";
import rolesRoutes from "./role.routes";
import departmentRoutes from "./department.routes";
import typesRoutes from "./types.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/roles", rolesRoutes);
router.use("/departments", departmentRoutes);
router.use("/types", typesRoutes);

export default router;
