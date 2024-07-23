// src/routes/ordersRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { createOrderSchema, updateOrderStatusSchema } = require("../validations/orderValidation");

router.use(authenticateUser);

router.post("/", validate(createOrderSchema), orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderDetails);
router.put("/update-status", validate(updateOrderStatusSchema), orderController.updateOrderStatus);

module.exports = router;