// src/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");

exports.authenticateUser = (req, _, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.user = null; // Pas d'utilisateur authentifié
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError(`Error validating token: ${error.message}`, 401));
  }
};

exports.requireAuth = (req, next) => {
  if (!req.user) {
    return next(new AppError("Authentication required", 401));
  }
  next();
};
