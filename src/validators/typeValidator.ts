import { body } from "express-validator";

export const type = [
  body("type_name")
    .trim()
    .notEmpty()
    .withMessage("El tipo no puede estar vacio")
    .isString()
    .withMessage("El tipo tiene que ser un texto")
    .isLength({ min: 3, max: 50 })
    .withMessage("El tipo tiene que tener entre 3 y 50 caracteres"),

  body("type_code")
  .trim()
  .notEmpty()
  .withMessage("El tipo no puede estar vacio")
  .isString()
  .withMessage("El tipo tiene que ser un texto")
  .isLength({ min: 3, max: 3 })
  .withMessage("El tipo debe tener exactamente 3 caracteres"),
];
