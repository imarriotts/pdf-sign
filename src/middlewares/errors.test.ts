import { errorHandler } from "./errors";
import { Request, Response, NextFunction } from "express";
import { createMocks } from "node-mocks-http";

describe("errorHandler", () => {
    it("debería manejar ValidationError", () => {
        const { req, res } = createMocks<Request, Response>();
        const next: NextFunction = jest.fn();
        const err = new Error("Error de validación");
        err.name = "ValidationError";

        errorHandler(err, req, res, next);

        const responseData = JSON.parse(res._getData());

        expect(res._getStatusCode()).toBe(400);
        expect(responseData).toEqual(expect.objectContaining({
            success: false,
            code: 400,
            errorData: expect.any(Array),
            message: "Error de validación",
        }));
    });

    it("debería manejar AuthenticationError", () => {
        const { req, res } = createMocks<Request, Response>();
        const next: NextFunction = jest.fn();
        const err = new Error("Error de autenticación");
        err.name = "AuthenticationError";

        errorHandler(err, req, res, next);

        const responseData = JSON.parse(res._getData());

        expect(res._getStatusCode()).toBe(401);
        expect(responseData).toEqual(expect.objectContaining({
            success: false,
            code: 401,
            errorData: expect.any(Array),
            message: "Error de autenticación",
        }));
    });

    it("debería manejar Error genérico", () => {
        const { req, res } = createMocks<Request, Response>();
        const next: NextFunction = jest.fn();
        const err = new Error("Error genérico");
        err.name = "Error";

        errorHandler(err, req, res, next);

        const responseData = JSON.parse(res._getData());

        expect(res._getStatusCode()).toBe(500);
        expect(responseData).toEqual(expect.objectContaining({
            success: false,
            code: 500,
            errorData: expect.any(Array),
            message: "Error genérico",
        }));
    });

    it("debería manejar error desconocido", () => {
        const { req, res } = createMocks<Request, Response>();
        const next: NextFunction = jest.fn();
        const err = new Error("Error desconocido");
        err.name = "UnknownError";

        errorHandler(err, req, res, next);

        const responseData = JSON.parse(res._getData());

        expect(res._getStatusCode()).toBe(200); // Asumiendo que 200 es el código de estado predeterminado
        expect(responseData).toEqual(expect.objectContaining({
            success: false,
            code: 200,
            errorData: expect.any(Array),
            message: "Error desconocido",
        }));
    });
});