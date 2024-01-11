import { NextFunction, Request, Response, Router } from "express";
import { authenticate, generateToken } from "../controllers/auth";
import { responseWrapper } from "../utils/wrappers/response";
import { loginValidationSchema } from "../validations/auth";

const router = Router();

/**
 * Servicio de autenticación
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Servicio de autenticación
 *     description: Retorna un token de autenticación.
 *     tags: [Autenticación]
 *     requestBody:
 *       description: Datos de autenticación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña
 *             example:
 *               username: admin
 *               password: password
 *     responses:
 *       200:
 *         description: Token de autenticación
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
 *                     token:
 *                       type: string
 *                       description: Token de autenticación
 *               example:
 *                 success: true
 *                 code: 200
 *                 data:
 *                   token: "token"
 */
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validación de datos de entrada
        next(loginValidationSchema.validate(req.body).error);

        // Obtención de datos de entrada
        const { username, password } = req.body;

        // logica de autenticación
        const { userId } = await authenticate(username, password);

        // Generación de token
        const token = generateToken(userId);

        // Respuesta
        res.status(200).json(responseWrapper({ token }));
    } catch (error) {
        next(error);
    }
});

// /**
//  * Servicio de prueba
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     bearerAuth:            
//  *       type: http
//  *       scheme: bearer
//  * /api/auth/login-test:
//  *   get:
//  *     summary: Servicio de prueba
//  *     description: Servicio de prueba de Login.
//  *     tags: [Autenticación]
//  *     security:
//  *       - bearerAuth: []     
//  *     responses:
//  *       200:
//  *         description: Successful operation
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   description: Indicates if the operation was successful
//  *                 code:
//  *                   type: integer
//  *                   description: HTTP status code
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: string
//  *                       description: User ID
//  *                     iat:
//  *                       type: integer
//  *                       description: timestamp de creación del token
//  *                     exp:
//  *                       type: integer
//  *                       description: timestamp de expiración del token
//  *               example:
//  *                 success: true
//  *                 code: 200
//  *                 data:
//  *                   id: "123456789"
//  *                   iat: 1704938377
//  *                   exp: 1704941977
//  */
// router.get("/login-test", jwtMiddleware, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const decodedToken = (req as any).decodedToken;
//         res.status(200).json(responseWrapper({ ...decodedToken }));
//     } catch (error) {
//         next(error);
//     }
// });

export default router;
