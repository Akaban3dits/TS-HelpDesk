import { Router } from "express";
import * as departmentController from "../controllers/departmentController";
import { validateDepartment } from "../validators/departmentValidator";
import { validationResultMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/count-departments", departmentController.countDepartments);
router.get("/search", departmentController.searchDepartment);
router.get("/", departmentController.getDepartments);
router.get("/:id", departmentController.findDepartmentById);
router.post(
  "/",
  validateDepartment,
  validationResultMiddleware,
  departmentController.createDepartment
);
router.put(
  "/:id",
  validateDepartment,
  validationResultMiddleware,
  departmentController.updateDepartment
);
router.delete("/:id", departmentController.deleteDepartment);

export default router;
