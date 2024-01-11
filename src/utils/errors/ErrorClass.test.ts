import { AuthenticationError, ValidationError } from "./ErrorClass";

describe("Clase ValidationError", () => {
  it("debería crear una instancia de ValidationError con el mensaje correcto", () => {
    const mensaje = "Mensaje de error de validación";
    const error = new ValidationError(mensaje);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(mensaje);
    expect(error.name).toBe("ValidationError");
  });
});

describe("Clase AuthenticationError", () => {
  it("debería crear una instancia de AuthenticationError con el mensaje correcto", () => {
    const mensaje = "Mensaje de error de autenticación";
    const error = new AuthenticationError(mensaje);
    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error.message).toBe(mensaje);
    expect(error.name).toBe("AuthenticationError");
  });
});