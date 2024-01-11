import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "../../middlewares/errors";
import { requestMiddleware } from "../../middlewares/request";
import authRoutes from "../../routes/auth";
import rootRoutes from "../../routes/root";
import pdfRoutes from "../../routes/pdf";
import swaggerSpec from "./swagger";

dotenv.config();

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para el servicio de salud
app.use("/", rootRoutes);

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

// Middleware de Validación de Datos de Entrada
app.use(requestMiddleware);

// Middleware de Manejo de Errores
app.use(errorHandler);

export default app;