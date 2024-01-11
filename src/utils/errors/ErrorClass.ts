/**
 * @description Clase para manejar errores de validación
 */
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

/**
 * @description Clase para manejar errores de autenticación
 */
export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
    }
}