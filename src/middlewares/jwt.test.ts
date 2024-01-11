import { NextFunction, Request, Response } from "express";
import { jwtMiddleware } from "./jwt";
import { createMocks } from "node-mocks-http";
import { verifyToken } from "../controllers/auth";

jest.mock("../controllers/auth");

describe("jwtMiddleware", () => {
    it("debería devolver un error si no se encuentra el token de autenticación", () => {
        const { req, res } = createMocks<Request, Response>({
            headers: {},
        });
        const next: NextFunction = jest.fn();

        jwtMiddleware(req, res, next);

        expect(res._getStatusCode()).toBe(401);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: "No se encontró el token de autenticación",
            })
        );
    });

    it("debería devolver un error si el token de autenticación es inválido", () => {
        const { req, res } = createMocks<Request, Response>({
            headers: {
                authorization: "Bearer invalid_token",
            },
        });
        const next: NextFunction = jest.fn();

        (verifyToken as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid token");
        });

        jwtMiddleware(req, res, next);

        expect(res._getStatusCode()).toBe(401);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: "El token de autenticación es inválido",
            })
        );
    });

    it("debería agregar el token decodificado al request si el token de autenticación es válido", () => {
        const { req, res } = createMocks<Request, Response>({
            headers: {
                authorization: "Bearer valid_token",
            },
        });
        const next: NextFunction = jest.fn();

        const decodedToken = { userId: "123" };
        (verifyToken as jest.Mock).mockReturnValue(decodedToken);

        jwtMiddleware(req, res, next);

        expect((req as any).decodedToken).toEqual(decodedToken);
        expect(next).toHaveBeenCalled();
    });
});