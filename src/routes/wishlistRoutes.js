// routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authenticateUser } = require("../middlewares/authMiddleware");

router.use(authenticateUser);
router.post("/add", wishlistController.addToWishlist);
router.get("/", wishlistController.getWishlist);

module.exports = router;
