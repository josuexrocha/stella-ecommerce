// src/middlewares/validate.js

const Joi = require("joi");

const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = Joi.compile(schema).validate(req[property], options);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors });
    }

    req[property] = value;
    next();
  };

module.exports = validate;
