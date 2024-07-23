// src/routes/starsRoutes.js
const express = require("express");
const router = express.Router();
const starController = require("../controllers/starController");
const validate = require("../middlewares/validate");
const { idSchema, filterSchema } = require("../validations/starValidation");

router.get("/", starController.getAllStars);
router.get("/:id", validate(idSchema, 'params'), starController.getStarById);
router.get("/filter", validate(filterSchema, 'query'), starController.filterStars);

module.exports = router;