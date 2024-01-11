import { responseWrapper } from "./response";

describe("responseWrapper", () => {
    it("debería crear una respuesta de éxito con los valores correctos", () => {
        const datos = { key: "value" };
        const exito = true;
        const codigo = 200;

        const respuesta = responseWrapper(datos, exito, codigo);

        expect(respuesta).toEqual({
            success: exito,
            code: codigo,
            data: datos,
            errorData: undefined,
        });
    });

    it("debería crear una respuesta de error con los valores correctos", () => {
        const datosDeError = { error: "Algo salió mal" };
        const exito = false;
        const codigo = 400;

        const respuesta = responseWrapper(datosDeError, exito, codigo);

        expect(respuesta).toEqual({
            success: exito,
            code: codigo,
            data: undefined,
            errorData: datosDeError,
        });
    });
});