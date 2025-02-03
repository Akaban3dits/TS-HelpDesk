import { Router } from "express";
import * as roleController from "../controllers/rolesController";
import { validateRole } from "../validators/roleValidator";
import { validationResultMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/", roleController.getRoles);
router.get("/:id", roleController.findRoleById);
router.post(
  "/",
  validateRole,
  validationResultMiddleware,
  roleController.createRole
);
router.put(
  "/:id",
  validateRole,
  validationResultMiddleware,
  roleController.updateRole
);

router.delete("/:id", roleController.deleteRole);
export default router;
