// src/middlewares/errorHandler.js

const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleSequelizeValidationError = (error) => {
  const messages = error.errors.map((err) => err.message);
  return new AppError(messages.join(". "), 400);
};

const handleDuplicateFieldsDB = (error) => {
  const value = error.errors[0].value;
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
  // Filtrer l'erreur pour éviter des objets circulaires
  const filteredError = {
    status: err.status,
    message: err.message,
    stack: err.stack,
    // Filtrer les détails complexes qui pourraient être circulaires
    error: {
      name: err.name,
      code: err.code,
      isOperational: err.isOperational,
      path: err.path,
      // Vous pouvez exclure d'autres propriétés complexes ici
    },
  };

  res.status(err.statusCode).json(filteredError);
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    logger.error("ERROR 💥", {
      message: err.message,
      stack: err.stack,
      ...err,
    });
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const errorHandler = (err, res, _next) => {
  console.error("Error caught in errorHandler:", err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
    let error = Object.assign({}, err);
    error.message = err.message;

    if (error.name === "SequelizeValidationError") {
      error = handleSequelizeValidationError(error);
    } else if (error.name === "SequelizeUniqueConstraintError") {
      error = handleDuplicateFieldsDB(error);
    } else if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    } else if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, res);
  }
};

module.exports = {
  AppError,
  errorHandler,
  handleSequelizeValidationError,
  handleDuplicateFieldsDB,
  handleJWTError,
  handleJWTExpiredError,
};
