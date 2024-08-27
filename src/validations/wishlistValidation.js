// src/validations/wishlistValidation.js
const Joi = require("joi");

const addToWishlistSchema = Joi.object({
  starId: Joi.number().integer().positive().required(),
});

module.exports = { addToWishlistSchema };
