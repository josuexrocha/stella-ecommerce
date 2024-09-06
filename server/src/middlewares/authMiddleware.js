// server/src/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");

exports.authenticateUser = (req, _res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        req.user = null;
        return next();
    }

    if (!authHeader.startsWith("Bearer ")) {
        req.user = null;
        return next();
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError(`Error validating token: ${error.message}`, 401));
    }
};

exports.requireAuth = (req, _res, next) => {
	if (!req.user) {
	  return next(new AppError("Authentication required", 401));
	}
	next();
  };
