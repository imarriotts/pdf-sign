import Joi from "joi";
import { ValidationError } from "../utils/errors/ErrorClass";

/**
 * @description Esquema de validación para la ruta /sign-pdf
 */
export const signPdfValidationSchema = Joi.object({
    password: Joi.string().optional(),
    certificateType: Joi.string().valid("p12", "crt").required().error(new ValidationError("El tipo de certificado es requerido y debe ser p12 o crt"))
});