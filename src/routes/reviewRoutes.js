// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticateUser } = require("../middlewares/authMiddleware");

router.use(authenticateUser);
router.post("/add", reviewController.addReview);

module.exports = router;
