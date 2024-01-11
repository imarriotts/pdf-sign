import request from "supertest";
import app from "./server";

describe("GET /", () => {
    it("responds with a status 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /api/auth", () => {
    it("responds with a status 200", async () => {
        const response = await request(app).post("/api/auth/login");
        // por ahora no tenemos un usuario para autenticar así que el servicio responde con 200
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /api/pdf", () => {
    it("responds with a status 401", async () => {
        const response = await request(app).post("/api/pdf/sign");
        expect(response.statusCode).toBe(401);
    });
});