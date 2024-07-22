// src/controllers/starController.js

const { Star } = require("../models");

exports.getAllStars = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.json(stars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving stars", error: error.message });
  }
};

exports.getStarById = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      res.json(star);
    } else {
      res.status(404).json({ message: "Star not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving star", error: error.message });
  }
};

exports.filterStars = async (req, res) => {
  try {
    const { constellation, minPrice, maxPrice, minMagnitude, maxMagnitude } =
      req.query;
    let whereClause = {};

    if (constellation) whereClause.constellation = constellation;
    if (minPrice) whereClause.price = { [Op.gte]: minPrice };
    if (maxPrice)
      whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
    if (minMagnitude) whereClause.magnitude = { [Op.gte]: minMagnitude };
    if (maxMagnitude)
      whereClause.magnitude = {
        ...whereClause.magnitude,
        [Op.lte]: maxMagnitude,
      };

    const stars = await Star.findAll({ where: whereClause });
    res.json(stars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering stars", error: error.message });
  }
};
