import { NextFunction, Request, Response } from "express";
import { errorResponseWrapper } from "../utils/wrappers/errors";

/**
 * @description Middleware para manejar errores
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // mensaje de error
    const message = err.message ?? "Ocurrió un error inesperado";

    // datos del error
    const errorData = [err.message, err.stack];

    // mapa de errores a status code
    const errorMap: { [key: string]: number } = {
        ValidationError: 400,
        AuthenticationError: 401,
        Error: 500
    };

    // status code
    const statusCode = errorMap[err.name] ?? res.statusCode;

    return res.status(statusCode).json(errorResponseWrapper(message, statusCode, errorData));
};
