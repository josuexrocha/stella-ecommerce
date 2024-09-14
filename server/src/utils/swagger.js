// src/utils/swagger.js

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stella API",
      version: "1.0.0",
      description: "API pour la plateforme e-commerce Stella de vente d'étoiles",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
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
      schemas: {
        Star: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            constellation: { type: "string" },
            magnitude: { type: "number" },
            price: { type: "number" },
            description: { type: "string" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        RegisterUserInput: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
          required: ["username", "email", "password"],
        },
        LoginUserInput: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          required: ["email", "password"],
        },
        Cart: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  starId: { type: "string" },
                  quantity: { type: "integer" },
                  price: { type: "number" },
                },
              },
            },
          },
        },
        AddToCartInput: {
          type: "object",
          properties: {
            starId: { type: "string" },
            quantity: { type: "integer" },
          },
          required: ["starId", "quantity"],
        },
        UpdateCartItemInput: {
          type: "object",
          properties: {
            cartItemId: { type: "string" },
            quantity: { type: "integer" },
          },
          required: ["cartItemId", "quantity"],
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  starId: { type: "string" },
                  quantity: { type: "integer" },
                  price: { type: "number" },
                },
              },
            },
            totalAmount: { type: "number" },
            status: { type: "string", enum: ["pending", "processing", "shipped", "delivered"] },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        CreateOrderInput: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  starId: { type: "string" },
                  quantity: { type: "integer" },
                },
              },
            },
          },
          required: ["items"],
        },
        UpdateOrderStatusInput: {
          type: "object",
          properties: {
            orderId: { type: "string" },
            status: { type: "string", enum: ["pending", "processing", "shipped", "delivered"] },
          },
          required: ["orderId", "status"],
        },
        Review: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            starId: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        AddReviewInput: {
          type: "object",
          properties: {
            starId: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
          },
          required: ["starId", "rating"],
        },
        Wishlist: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            stars: {
              type: "array",
              items: { $ref: "#/components/schemas/Star" },
            },
          },
        },
        AddToWishlistInput: {
          type: "object",
          properties: {
            starId: { type: "string" },
          },
          required: ["starId"],
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};
