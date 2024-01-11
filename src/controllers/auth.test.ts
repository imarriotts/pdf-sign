import { authenticate, generateToken, verifyToken } from "./auth";
import jwt from "jsonwebtoken";

describe("Funciones de autenticación", () => {
    const userId = "123456789";
    const secretKey = "secret";
    process.env.JWT_SECRET = secretKey;

    test("authenticate", async () => {
        const result = await authenticate("username", "password");
        expect(result).toEqual({ userId });
    });

    test("generateToken", () => {
        const token = generateToken(userId);
        const decoded = jwt.verify(token, secretKey);
        expect(decoded).toHaveProperty("id", userId);
    });

    test("verifyToken", () => {
        const token = jwt.sign({ id: userId }, secretKey);
        const decoded = verifyToken(token);
        expect(decoded).toHaveProperty("id", userId);
    });
});