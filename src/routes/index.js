// src/routes/index.js

const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");

const starsRoutes = require("./starsRoutes");
const usersRoutes = require("./usersRoutes");
const ordersRoutes = require("./ordersRoutes");
const cartRoutes = require("./cartRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const reviewRoutes = require("./reviewRoutes");

// Routes publiques
router.use("/stars", starsRoutes);
router.use("/users", usersRoutes);

// Middleware d'authentification pour toutes les routes suivantes
router.use(authenticateUser);

// Routes nécessitant une authentification
router.use("/orders", ordersRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
