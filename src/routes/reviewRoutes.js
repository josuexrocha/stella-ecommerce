// src/routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { addReviewSchema } = require("../validations/reviewValidation");

router.use(authenticateUser);
router.post("/add", validate(addReviewSchema), reviewController.addReview);

module.exports = router;