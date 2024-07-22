// src/controllers/starController.js

const { Star } = require("../models");

exports.getAllStars = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.json(stars);
  } catch (_error) {
    res.status(500).json({ message: "Error retrieving stars" });
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
  } catch (_error) {
    res.status(500).json({ message: "Error retrieving star" });
  }
};
