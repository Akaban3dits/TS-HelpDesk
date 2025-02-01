import { Router } from "express";
import * as roleController from "../controllers/rolesController";
import { validateCreateRole } from "../validators/roleValidator";
import { validationResultMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/", roleController.getRoles);
router.get("/:id", roleController.findRoleById);
router.post("/", validateCreateRole, validationResultMiddleware, roleController.createRole);

export default router;
