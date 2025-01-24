// src/controllers/orderController.js

const { Order, OrderStar, Star, User, sequelize } = require("../models");
const { AppError } = require("../middlewares/errorHandler");

exports.createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Vérifie que l'utilisateur existe bien dans la base de données
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      throw new AppError(`User with id ${req.user.userId} not found`, 404);
    }

    // Création de la commande avec transaction
    const order = await Order.create(
      {
        UserId: req.user.userId,
        date: new Date(),
        status: "pending",
        totalAmount: 0, // Calculé plus tard
        shippingAddress,
        paymentMethod,
      },
      { transaction },
    );

    if (!order || !order.id) {
      throw new AppError("Order creation failed", 500);
    }

    let totalAmount = 0;
    for (const item of items) {
      const star = await Star.findByPk(item.starId);
      if (!star) {
        throw new AppError(`Star with id ${item.starId} not found`, 404);
      }

      // Création des éléments dans OrderStar avec transaction
      await OrderStar.create(
        {
          orderId: order.id, // Utilise 'orderId' cohérent avec la BDD
          starId: star.id, // Utilise 'starId' cohérent avec la BDD
          quantity: item.quantity,
        },
        { transaction },
      );

      totalAmount += star.price * item.quantity;
    }

    // Mise à jour du montant total de la commande
    order.totalAmount = totalAmount;
    await order.save({ transaction });

    // Commit de la transaction
    await transaction.commit();

    res.status(201).json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    // Rollback en cas d'erreur
    await transaction.rollback();
    console.error("Error in createOrder function:", error);
    next(new AppError(`Error creating order: ${error.message}`, 400));
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.userId },
      include: [
        {
          model: OrderStar,
          include: [Star],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    next(new AppError(`Error fetching user orders: ${error.message}`, 500));
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, UserId: req.user.userId },
      include: [{ model: OrderStar, include: [Star] }],
    });
    if (!order) {
      return next(new AppError("Order not found", 404));
    }
    res.json(order);
  } catch (error) {
    next(new AppError(`Error fetching order details: ${error.message}`, 500));
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    // Vérifier si l'utilisateur est un admin
    const user = await User.findByPk(req.user.userId);
    if (user.role !== "admin") {
      return next(new AppError("Only admins can update order status", 403));
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    next(new AppError(`Error updating order status: ${error.message}`, 400));
  }
};

module.exports = exports;
