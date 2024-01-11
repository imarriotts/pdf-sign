import multer from "multer";

/**
 * Configuración de Multer para subir archivos
 */
const storage = multer.memoryStorage();

/**
 * Middleware para subir archivos
 */
export const upload = multer({ storage: storage });
