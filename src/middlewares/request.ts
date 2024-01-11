import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { errorResponseWrapper } from "../utils/wrappers/errors";

/**
 * @description Middleware para manejar inputs de entrada
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const requestMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 400;
    // validación de datos de entrada con Joi
    if (err instanceof ValidationError) {
        const message = err.details.concat().map((error) => error.message).join(", ");
        const errorData = [err.stack, err.name, err.message, JSON.stringify(req)];
        return res.status(statusCode).json(errorResponseWrapper(message, statusCode, errorData));
    }
};