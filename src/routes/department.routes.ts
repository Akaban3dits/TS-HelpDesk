import { Router } from "express";
import * as roleController from "../controllers/departmentController";
import { validateDepartment } from "../validators/departmentValidator";
import { validationResultMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/count-departments", roleController.countDepartments);
router.get("/search", roleController.searchDepartment);
router.get("/", roleController.getDepartments);
router.get("/:id", roleController.findDepartmentById);
router.post(
  "/",
  validateDepartment,
  validationResultMiddleware,
  roleController.createDepartment
);
router.put(
  "/:id",
  validateDepartment,
  validationResultMiddleware,
  roleController.updateDepartment
);
router.delete("/:id", roleController.deleteDepartment);


//* Update requiere ajustes, el mismo nombre se envia
//* Contador por error
//* Search no hace su busqueda

export default router;
