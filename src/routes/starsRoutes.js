// src/routes/starsRoutes.js

const express = require("express");
const router = express.Router();
const starController = require("../controllers/starController");

// GET all stars
router.get("/", starController.getAllStars);

// GET a single star by ID
router.get("/:id", starController.getStarById);

// GET pour le filtrage
router.get("/filter", starController.filterStars);

module.exports = router;
