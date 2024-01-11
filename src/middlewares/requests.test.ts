import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { createMocks } from "node-mocks-http";
import { requestMiddleware } from "./request";

describe("requestMiddleware", () => {
    it("debería manejar ValidationError", () => {
        const { req, res } = createMocks<Request, Response>();
        const next: NextFunction = jest.fn();
        const err = new ValidationError("Error de validación", [], null);

        requestMiddleware(err, req, res, next);

        const responseData = JSON.parse(res._getData());

        expect(res._getStatusCode()).toBe(400);
        expect(responseData).toEqual(expect.objectContaining({
            success: false,
            code: 400,
            errorData: expect.any(Array),
            message: expect.stringContaining(""),
        }));
    });
});