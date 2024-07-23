// src/validations/orderValidation.js
const Joi = require('joi');

const createOrderSchema = Joi.object({
  // Ajoutez ici les champs nécessaires pour créer une commande
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().required(),
});

const updateOrderStatusSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  status: Joi.string().valid('processing', 'shipped', 'delivered').required(),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
