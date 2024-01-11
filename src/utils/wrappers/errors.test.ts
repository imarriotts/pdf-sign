import { errorResponseWrapper } from "./errors";

describe("errorResponseWrapper", () => {
    it("debería crear una respuesta de error con los valores correctos", () => {
        const mensaje = "Mensaje de error";
        const codigo = 500;
        const datosDeError = { detail: "Algo salió mal" };

        const respuesta = errorResponseWrapper(mensaje, codigo, datosDeError);

        expect(respuesta).toEqual({
            success: false,
            code: codigo,
            errorData: datosDeError,
            message: mensaje,
        });
    });

    it("debería crear una respuesta de error con valores predeterminados si no se proporcionan", () => {
        const mensaje = "Mensaje de error";

        const respuesta = errorResponseWrapper(mensaje);

        expect(respuesta).toEqual({
            success: false,
            code: 400,
            errorData: null,
            message: mensaje,
        });
    });
});