import { Router } from "express";
import * as typeController from "../controllers/typeController";
import { ValidateType } from "../validators/typeValidator";
import { validationResultMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/search", typeController.searchType);
router.get("/", typeController.getTypes);
router.get("/:id", typeController.findTypeById);
router.post(
  "/",
  ValidateType,
  validationResultMiddleware,
  typeController.createType
);
router.put(
  "/:id",
  ValidateType,
  validationResultMiddleware,
  typeController.updateType
);
router.delete("/:id", typeController.deleteType);

export default router;
