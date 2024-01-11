import { Request, Response, Router } from "express";
import { responseWrapper } from "../utils/wrappers/response";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta raíz
 *     tags: [Ruta Raíz]
 *     description: Retorna un mensaje de bienvenida del servicio de firma de PDF.
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 code:
 *                   type: integer
 *                   description: Código de estado HTTP
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Mensaje de bienvenida
 */
router.get("/", (req: Request, res: Response) => {
    const message = "Bienvenido al Servicio de Firma de PDF";
    res.status(200).json(responseWrapper({ message }));
});


export default router;
