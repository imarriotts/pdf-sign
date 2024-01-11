import { ValidationError } from "../utils/errors/ErrorClass";
import { loginValidationSchema } from "./auth";


describe("loginValidationSchema", () => {
    it("debería validar correctamente un objeto de inicio de sesión válido", () => {
        const loginData = {
            username: "testuser",
            password: "testpassword",
        };

        const { error } = loginValidationSchema.validate(loginData);

        expect(error).toBeUndefined();
    });

    it("debería dar un error cuando el nombre de usuario no está presente", () => {
        const loginData = {
            password: "testpassword",
        };

        const { error } = loginValidationSchema.validate(loginData);

        expect(error).toBeInstanceOf(ValidationError);
        expect(error?.message).toBe("El nombre de usuario es requerido");
    });

    it("debería dar un error cuando la contraseña no está presente o tiene menos de 6 caracteres", () => {
        const loginData = {
            username: "testuser",
            password: "test",
        };

        const { error } = loginValidationSchema.validate(loginData);

        expect(error).toBeInstanceOf(ValidationError);
        expect(error?.message).toBe("La contraseña es requerida y debe tener al menos 6 caracteres");
    });
});