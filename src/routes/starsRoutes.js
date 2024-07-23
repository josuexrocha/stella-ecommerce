// src/routes/starsRoutes.js
const express = require("express");
const router = express.Router();
const starController = require("../controllers/starController");
const validate = require("../middlewares/validate");
const { idSchema, filterSchema } = require("../validations/starValidation");

/**
 * @swagger
 * /stars:
 *   get:
 *     summary: Get all stars
 *     tags: [Stars]
 *     responses:
 *       200:
 *         description: List of all stars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Star'
 */
router.get("/", starController.getAllStars);

/**
 * @swagger
 * /stars/{id}:
 *   get:
 *     summary: Get a star by ID
 *     tags: [Stars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Star details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Star'
 *       404:
 *         description: Star not found
 */
router.get("/:id", validate(idSchema, 'params'), starController.getStarById);

/**
 * @swagger
 * /stars/filter:
 *   get:
 *     summary: Filter stars
 *     tags: [Stars]
 *     parameters:
 *       - in: query
 *         name: constellation
 *         schema:
 *           type: string
 *       - in: query
 *         name: minMagnitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxMagnitude
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Filtered list of stars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Star'
 */
router.get("/filter", validate(filterSchema, 'query'), starController.filterStars);

module.exports = router;