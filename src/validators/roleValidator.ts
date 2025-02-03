import { body } from "express-validator";

export const validateRole = [
  body("role_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de rol es obligatorio")
    .isString()
    .withMessage("El nombre del rol debe ser un texto")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre del rol debe tener entre 3 y 50 caracteres"),
];
