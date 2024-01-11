import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../controllers/auth";
import { errorResponseWrapper } from "../utils/wrappers/errors";

/**
 * @description Middleware para validar el token de autenticación
 * @param req 
 * @param res 
 * @param next 
 */
export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // valida si existe el header authorization
    const authorization = req.headers.authorization;

    // valida si el servicio
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json(errorResponseWrapper("No se encontró el token de autenticación"));
    }

    // obtiene el token
    const token = authorization.split(" ")[1];

    try {
        // verifica el token
        const decoded = verifyToken(token);
        // se agrega el token decodificado al request
        (req as unknown as any).decodedToken = decoded;
    } catch (err) {
        return res.status(401).json(errorResponseWrapper("El token de autenticación es inválido"));
    }



    next();
};