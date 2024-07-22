// src/controllers/orderController.js
const { Order, OrderStar, Star } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const order = await Order.create({
      UserId: req.user.userId,
      date: new Date(),
      status: 'pending',
      totalAmount: 0 // Sera calculé plus tard
    });

    let totalAmount = 0;
    for (let item of items) {
      const star = await Star.findByPk(item.starId);
      if (!star) {
        throw new Error(`Star with id ${item.starId} not found`);
      }
      await OrderStar.create({
        OrderId: order.id,
        StarId: star.id,
        quantity: item.quantity
      });
      totalAmount += star.price * item.quantity;
    }

    order.totalAmount = totalAmount;
    await order.save();

    res.status(201).json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.userId },
      include: [{ model: OrderStar, include: [Star] }]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.orderId, UserId: req.user.userId },
      include: [{ model: OrderStar, include: [Star] }]
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findOne({
      where: { id: orderId, UserId: req.user.userId }
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(400).json({ message: "Error updating order status", error: error.message });
  }
};