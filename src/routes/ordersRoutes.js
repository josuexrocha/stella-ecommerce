// src/routes/ordersRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order (protected route)
router.post("/", orderController.createOrder);

// GET user's orders (protected route)
router.get("/", orderController.getUserOrders);

// GET a specific order by ID (protected route)
router.get("/:id", orderController.getOrderDetails);

module.exports = router;
