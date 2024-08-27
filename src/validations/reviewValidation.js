// src/validations/reviewValidation.js
const Joi = require("joi");

const addReviewSchema = Joi.object({
  starId: Joi.number().integer().positive().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(500),
});

module.exports = { addReviewSchema };
