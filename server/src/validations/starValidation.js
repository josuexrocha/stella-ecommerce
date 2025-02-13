// src/validations/starValidation.js
const Joi = require("joi");

const idSchema = Joi.object({
  starid: Joi.number().integer().positive().required(),
});

const filterSchema = Joi.object({
  constellation: Joi.string(),
  minMagnitude: Joi.number(),
  maxMagnitude: Joi.number(),
});

module.exports = { idSchema, filterSchema };
