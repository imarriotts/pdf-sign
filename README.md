# Aplicación Express: Servicio de Firma de PDF

## Descripción General del Proyecto

Esta aplicación de Node.js/Express, llamada `pdf-sign`, está diseñada para proporcionar funcionalidades de firma de PDFs. Soporta diferentes tipos de certificados e incluye soporte para Docker, lo que facilita su despliegue y asegura la consistencia del entorno.

## Estructura del Proyecto

```
.github                         # Configuraciones de GitHub
    workflows/                  # Configuraciones de GitHub Actions
        node.js.yml             # Configuración de GitHub Actions para Node.js
package.json                    # Metadatos del proyecto y dependencias
.vscode/                        # Configuraciones de VS Code
    launch.json                 # Configuraciones para debug
.dockerignore                   # Especifica patrones a excluir en las construcciones de Docker
.gitignore                      # Especifica patrones a excluir en Git
Dockerfile                      # Define instrucciones para construir la imagen de Docker
.env                            # Variables de entorno
.env.example                    # Ejemplo de variables de entorno
.eslintrc.json                  # Configuración de ESLint para calidad de código
tsconfig.json                   # Configuración del compilador de TypeScript
.nvmrc                          # Especificación de versión de Node para nvm    
package-lock.json               # Versiones fijas de dependencias
src/                            # Directorio de código fuente
    server.ts                   # Punto de entrada del servidor Express     
    controllers/                # Controladores de rutas
        auth.ts                 # Lógica de autenticación
        pdf.ts                  # Lógica de procesamiento de PDF
    routes/                     # Rutas de la aplicación
        root.ts                 # Rutas de nivel raíz
        auth.ts                 # Rutas de autenticación
        pdf.ts                  # Rutas relacionadas con PDF
    validations/                # Validaciones
        auth.ts                 # Validaciones para autenticación
        pdf.ts                  # Validaciones para procesamiento de PDF    
    middlewares/                # Middlewares
        upload.ts               # Middleware para manejo de subidas de archivos
        errors.ts               # Manejo centralizado de errores
        jwt.ts                  # Middleware para autenticación JWT
        request.ts              # Middleware para manejo de solicitudes
    utils/                      # Utilidades
        config/                 # Configuraciones
            server.ts           # Configuraciones del servidor
            swagger.ts          # Configuraciones de documentación Swagger/OpenAPI
        errors/                 # Manejo de errores
            ErrorClass.ts       # Clase personalizada para manejo uniforme de errores
        wrappers/               # Envoltorios (wrappers)
            response.ts         # Envoltorio para respuestas de API
            errors.ts           # Formateo de respuestas de error
```

## Requerimientos

Asegúrate de tener los siguientes requisitos previos instalados antes de comenzar con el desarrollo y la ejecución de este proyecto.

- **Node.js**: Este proyecto está desarrollado en Node.js Hydrogen y requiere Node.js para ejecutarse. Puedes descargarlo e instalarlo desde [nodejs.org](https://nodejs.org/).

- **npm (Node Package Manager)**: npm se instala automáticamente junto con Node.js. Es necesario para gestionar las dependencias del proyecto.

- **TypeScript**: Este proyecto utiliza TypeScript. Puedes instalar TypeScript globalmente con `npm install -g typescript`.

- **Docker (Opcional)**: Si deseas contenerizar la aplicación para su implementación en un entorno de contenedor, asegúrate de tener Docker instalado. Puedes descargarlo desde [Docker Hub](https://hub.docker.com/).


## Scripts en `package.json`

- `start`: Ejecuta `node out/server.js`, arrancando la aplicación compilada.
- `dev`: Ejecuta `nodemon src/server.ts` para desarrollo con reinicio automático.
- `build`: Compila los archivos TypeScript a JavaScript.
- `lint`: Ejecuta ESLint para revisar el estilo del código.
- `lint:fix`: Ejecuta ESLint y corrige automáticamente los problemas que pueda.
- `test`: Ejecuta los tests unitarios.
- `test:watch`: Ejecuta los tests unitarios en modo observador.

## Tests Unitarios
Este proyecto incluye pruebas unitarias para garantizar la calidad y la fiabilidad del código. A continuación, se muestra una descripción general de las pruebas unitarias disponibles y cómo ejecutarlas.

- Asegurate de tener las dependencias instaladas ejecutando `npm ci`.
- Ejecuta `npm run test` para ejecutar los tests unitarios.
- Ejecuta `npm run test:watch` para ejecutar los tests unitarios en modo observador.


## Dockerización de la Aplicación

El `Dockerfile` proporciona las instrucciones para contenerizar la aplicación, facilitando su despliegue y operación en cualquier entorno que soporte Docker.

## APIs y Rutas

La aplicación `pdf-sign` ofrece varias rutas para manejar la autenticación, el procesamiento de PDFs y la documentación de la API:

### Autenticación - `/api/auth`

- `POST /api/auth/login`: Endpoint para iniciar sesión. Los usuarios proporcionan credenciales (como nombre de usuario y contraseña) y reciben un token JWT si la autenticación es exitosa.

### Procesamiento y Firma de PDFs - `/api/pdf`

- `POST /api/pdf/sign`: Endpoint para firmar documentos PDF. Los usuarios deben enviar un PDF, un certificado de firma digital (en formato `.p12`), y la contraseña del certificado si es necesario. El servidor procesa la solicitud y devuelve el PDF firmado.

### Documentación de la API - `/api-docs`

- Swagger UI está disponible en `/api-docs`. Esta interfaz ofrece una documentación interactiva y visual de todas las rutas de la API, permitiendo a los usuarios probar los endpoints directamente desde el navegador.

## Detalles Adicionales de las Rutas

- **Manejo de Errores**: Cada ruta incluye un manejo robusto de errores para proporcionar respuestas informativas en caso de problemas, como credenciales inválidas o errores en la firma de documentos.
- **Validaciones**: Se aplican validaciones para asegurar que las entradas de los usuarios cumplen con los requisitos esperados. Esto incluye la validación de formatos de archivo, la presencia de todos los campos necesarios y el cumplimiento de los estándares de seguridad.
- **Autenticación y Seguridad**: Las rutas sensibles están protegidas mediante autenticación JWT, asegurando que solo los usuarios autenticados puedan acceder a ciertas funcionalidades.
- **Middleware de Carga de Archivos**: Se utiliza `multer` para facilitar la carga de archivos en las rutas que manejan documentos PDF y certificados digitales.

Este resumen proporciona una visión general de las capacidades y rutas de la aplicación `pdf-sign`, destacando su funcionalidad clave y estructura de API.
