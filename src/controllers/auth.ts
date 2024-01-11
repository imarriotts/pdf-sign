import jwt from "jsonwebtoken";

/**
 * @description Autentica un usuario
 * @param username 
 * @param password 
 * @returns 
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const authenticate = async (username: string, password: string): Promise<{ userId: string }> => {
    // logica de autenticación
    const userId = "123456789";
    // aqui deberia ir la logica de autenticación para validar el usuario y contraseña 
    // por ejemplo llamando a una base de datos o a un servicio externo
    return { userId };
};

/**
 * @description Genera un jwt token
 * @param userId 
 * @returns 
 */
export const generateToken = (userId: string): string => {
    // La clave secreta debe ser un valor que se obtenga de una variable de entorno, no deberia tener valor por default pero por simplicidad lo tiene
    const secretKey = process.env.JWT_SECRET ?? "secret";
    if (!secretKey) throw new Error("No se encontró la clave secreta");
    // Generación de token
    const token = jwt.sign({ id: userId }, secretKey, {
        expiresIn: "1h"
    });
    return token;
};

/**
 * @description Verifica un jwt token
 * @param token 
 * @returns 
 */
export const verifyToken = (token: string): string | object => {
    // La clave secreta debe ser un valor que se obtenga de una variable de entorno, no deberia tener valor por default pero por simplicidad lo tiene
    const secretKey = process.env.JWT_SECRET ?? "secret";;
    if (!secretKey) throw new Error("No se encontró la clave secreta");
    // Verificación de token
    const decoded = jwt.verify(token, secretKey);
    return decoded;
};