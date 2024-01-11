import { signPdf, signWithP12, signWithCrt } from "./pdf";
import { SignPdf } from "node-signpdf";
import { Buffer } from "buffer";

jest.mock("node-signpdf");

describe("Funciones de pdf", () => {
    const pdfBuffer = Buffer.from("pdf content");
    const certBuffer = Buffer.from("cert content");
    const password = "password";
    
    jest.spyOn(SignPdf.prototype, "sign").mockReturnValue(Buffer.from("signed pdf content"));
    
    test("firma un pdf con un certificado .p12 y una contraseña", async () => {
        const result = await signPdf(pdfBuffer, certBuffer, "p12", password);
        expect(result).toBeInstanceOf(Buffer);
    });

    test("firma un pdf con un certificado .crt y una contraseña", async () => {
        await expect(signPdf(pdfBuffer, certBuffer, "crt", password)).rejects.toThrow("signWithCrt sin implementar");
    });

    test("firma un pdf con un certificado no soportado y una contraseña", async () => {
        await expect(signPdf(pdfBuffer, certBuffer, "unsupported", password)).rejects.toThrow("Unsupported certificate type");
    });

    test("firma pdf con p12", async () => {
        const signer = new SignPdf();
        signer.sign = jest.fn().mockReturnValue(Buffer.from("signed pdf content"));
        const result = await signWithP12(pdfBuffer, certBuffer, password);
        expect(result).toBeInstanceOf(Buffer);
    });

    test("firma pdf con crt", async () => {
        await expect(signWithCrt(pdfBuffer, certBuffer, password)).rejects.toThrow("signWithCrt sin implementar");
    });
});