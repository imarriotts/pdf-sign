import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Firmado de PDF",
      version: "1.0.0",
      description: "Una API para firmar documentos PDF",
      contact: {
        name: "Ivan Marriott",
        email: "imarriotts@gmail.com",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  // archivos ts y js de las rutas
  apis: ["./src/routes/*.ts", "./src/routes/*.js"],

};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


export default swaggerSpec;
