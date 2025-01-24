// src/middlewares/validate.js

const { compile } = require("joi");
const { AppError } = require("./errorHandler");

const validate =
  (schema, property = "body") =>
  (req, _res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = compile(schema).validate(req[property], options);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return next(new AppError("Validation failed", 400, errors));
    }

    req[property] = value;
    next();
  };

module.exports = validate;
