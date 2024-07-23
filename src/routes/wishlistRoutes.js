// src/routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { addToWishlistSchema } = require("../validations/wishlistValidation");

router.use(authenticateUser);
router.post("/add", validate(addToWishlistSchema), wishlistController.addToWishlist);
router.get("/", wishlistController.getWishlist);

module.exports = router;