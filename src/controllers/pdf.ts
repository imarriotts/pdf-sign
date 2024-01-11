import { SignPdf } from "node-signpdf";

/**
 * @description Firma un pdf con un certificado y una contraseña
 * @param pdfBuffer 
 * @param certBuffer 
 * @param certificateType
 * @param password 
 * @returns 
 */
export const signPdf = async (pdfBuffer: Buffer, certBuffer: Buffer, certificateType: string, password: any): Promise<Buffer> => {
    switch (certificateType) {
        case "p12":
            return signWithP12(pdfBuffer, certBuffer, password);
        case "crt":
            return signWithCrt(pdfBuffer, certBuffer, password);
        default:
            throw new Error("Unsupported certificate type");
    }
};


/**
 * @description Firma un pdf con un certificado .p12 y una contraseña
 * @param pdfBuffer 
 * @param certBuffer 
 * @param password 
 * @returns 
 */
export const signWithP12 = async (
    pdfBuffer: Buffer,
    certBuffer: Buffer,
    password: string
): Promise<Buffer> => {
    // generamos una instancia de SignPdf
    const signer = new SignPdf();
    // cargamos el certificado y la contraseña
    return signer.sign(pdfBuffer, certBuffer, { passphrase: password });
};


/**
 * @description Firma un pdf con un certificado .crt y una contraseña
 * @param pdfBuffer 
 * @param certBuffer 
 * @param password 
 */
export const signWithCrt = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pdfBuffer: Buffer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    certBuffer: Buffer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string
): Promise<Buffer> => {
    // no estoy seguro de la implementación de este método no habia escuchado de firmar con un certificado .crt 
    // y tampoco tengo un certificado de este tipo para probarlo
    throw new Error("signWithCrt sin implementar");
};
