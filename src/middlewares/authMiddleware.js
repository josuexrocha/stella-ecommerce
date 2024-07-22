// src/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");

exports.authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(new AppError("Authentication required", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    next(new AppError("Invalid token", 401));
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }
  next();
};
