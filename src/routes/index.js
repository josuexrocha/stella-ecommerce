// src/routes/index.js

const express = require("express");
const router = express.Router();

const starsRoutes = require("./starsRoutes");
const usersRoutes = require("./usersRoutes");
const ordersRoutes = require("./ordersRoutes");
const cartRoutes = require("./cartRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/stars", starsRoutes);
router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
