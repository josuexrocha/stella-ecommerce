// src/routes/usersRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/authMiddleware");

// Register a new user
router.post("/register", userController.register);

// Login user
router.post("/login", userController.login);

// GET user profile (protected route)
router.get("/profile", authenticateUser, userController.getUserProfile);

module.exports = router;
