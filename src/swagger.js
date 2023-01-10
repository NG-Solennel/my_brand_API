import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Doc - Sol Brand Version 1",
      version: "1.0.0",
      description: "An API for a professional branding portfolio website",
    },
    servers: [
      {
        url: process.env.API_SERVER_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/api/*.js"],
};

const specs = swaggerJSDoc(options);
export default specs;
