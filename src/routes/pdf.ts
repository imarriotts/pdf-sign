import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../middlewares/upload";
import { ValidationError } from "../utils/errors/ErrorClass";
import { signPdf } from "../controllers/pdf";
import { signPdfValidationSchema } from "../validations/pdf";
import { jwtMiddleware } from "../middlewares/jwt";

const router = Router();

/**
 * @swagger
 * /api/pdf/sign:
 *   post:
 *     summary: Firma un PDF
 *     description: Este servicio recibe un PDF y un certificado para firmar el PDF
 *     tags: [PDF]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: pdf
 *         type: file
 *         description: El PDF a firmar
 *         required: true
 *       - in: formData
 *         name: certificate
 *         type: file
 *         description: El certificado para firmar el PDF
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         description: La contraseña del certificado
 *         required: false
 *       - in: formData
 *         name: certificateType
 *         type: string
 *         description: El tipo de certificado
 *         enum: [p12, crt]
 *         required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post("/sign", upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "certificate", maxCount: 1 }
]), jwtMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validación de datos de entrada
        next(signPdfValidationSchema.validate(req.body).error);

        // casteamos el objeto files a un objeto de tipo Express.Multer.File[]
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        // obtenemos los archivos del request
        const pdfFile = files.pdf ? files.pdf[0] : null;
        const certificateFile = files.certificate ? files.certificate[0] : null;
        const { certificateType, password } = req.body;

        // validamos que los archivos existan
        if (!pdfFile || !certificateFile) {
            throw new ValidationError("No se encontraron los archivos necesarios");
        }

        // obtenemos el buffer de cada archivo
        const pdfBuffer = pdfFile.buffer;
        const certificateBuffer = certificateFile.buffer;

        // firmamos el pdf
        const signedPdf = await signPdf(pdfBuffer, certificateBuffer, certificateType, password);

        // seteamos los headers de la respuesta
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=signed.pdf");
        res.setHeader("Content-Length", signedPdf.length);

        // enviamos el pdf firmado
        res.send(signedPdf);

    } catch (error) {
        next(error);
    }
});

export default router;