import { ValidationError } from "../utils/errors/ErrorClass";
import { signPdfValidationSchema } from "./pdf";

describe("signPdfValidationSchema", () => {
    it("debería validar correctamente un objeto de firma de PDF válido", () => {
        const signPdfData = {
            password: "testpassword",
            certificateType: "p12",
        };

        const { error } = signPdfValidationSchema.validate(signPdfData);

        expect(error).toBeUndefined();
    });

    it("debería dar un error cuando el tipo de certificado no está presente o no es válido", () => {
        const signPdfData = {
            password: "testpassword",
            certificateType: "invalid",
        };

        const { error } = signPdfValidationSchema.validate(signPdfData);

        expect(error).toBeInstanceOf(ValidationError);
        expect(error?.message).toBe("El tipo de certificado es requerido y debe ser p12 o crt");
    });
});