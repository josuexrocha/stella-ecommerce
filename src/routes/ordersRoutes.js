// src/routes/ordersRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateUser } = require("../middlewares/authMiddleware");

// Appliquer authenticateUser à toutes les routes
router.use(authenticateUser);

// Create a new order (protected route)
router.post("/", orderController.createOrder);

// GET user's orders (protected route)
router.get("/", orderController.getUserOrders);

// GET a specific order by ID (protected route)
router.get("/:id", orderController.getOrderDetails);

// Nouvelle route pour mettre à jour le statut d'une commande
router.put("/update-status", orderController.updateOrderStatus);

module.exports = router;