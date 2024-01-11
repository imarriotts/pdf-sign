import Joi from "joi";
import { ValidationError } from "../utils/errors/ErrorClass";

/**
 * @description Esquema de validación para la ruta /login
 */
export const loginValidationSchema = Joi.object({
    username: Joi.string().required().error(new ValidationError("El nombre de usuario es requerido")),
    password: Joi.string().min(6).required().error(new ValidationError("La contraseña es requerida y debe tener al menos 6 caracteres"))
});