// src/validations/cartValidation.js
const Joi = require('joi');

const addToCartSchema = Joi.object({
  starId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required(),
});

const updateCartItemSchema = Joi.object({
  cartItemId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
});

const removeFromCartSchema = Joi.object({
  cartItemId: Joi.number().integer().positive().required(),
});

module.exports = { addToCartSchema, updateCartItemSchema, removeFromCartSchema };
