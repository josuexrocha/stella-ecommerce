// src/controllers/starController.js

const { Star } = require("../models");
const { Op } = require("sequelize");
const { AppError } = require("../middlewares/errorHandler");

exports.getAllStars = async (_, res, next) => {
  try {
    const stars = await Star.findAll();
    res.json({ data: stars });
  } catch (error) {
    next(new AppError(`Error retrieving stars: ${error.message}`, 500));
  }
};

exports.getStarById = async (req, res, next) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      res.json(star);
    } else {
      next(new AppError("Star not found", 404));
    }
  } catch (error) {
    next(new AppError(`Error retrieving star: ${error.message}`, 500));
  }
};

exports.filterStars = async (req, res, next) => {
  try {
    const { constellation, minPrice, maxPrice, minMagnitude, maxMagnitude } = req.query;
    const whereClause = {};

    if (constellation) whereClause.constellation = constellation;
    if (minPrice) whereClause.price = { [Op.gte]: minPrice };
    if (maxPrice) whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
    if (minMagnitude) whereClause.magnitude = { [Op.gte]: minMagnitude };
    if (maxMagnitude) whereClause.magnitude = { ...whereClause.magnitude, [Op.lte]: maxMagnitude };

    const stars = await Star.findAll({ where: whereClause });
    res.json(stars);
  } catch (error) {
    console.error("Error in filterStars function:", error);
    next(new AppError(`Error filtering stars: ${error.message}`, 500));
  }
};
