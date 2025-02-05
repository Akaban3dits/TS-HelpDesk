import { body } from "express-validator";

export const validateDepartment = [
  body("department_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre del departamento es obligatorio")
    .isString()
    .withMessage("El nombre del rol debe ser un texto")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre del rol debe tener entre 3 y 50 "),
];
