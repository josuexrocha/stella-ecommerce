// src/controllers/wishlistController.js

const { Wishlist, Star } = require("../models");
const { AppError } = require('../middlewares/errorHandler');

exports.addToWishlist = async (req, res, next) => {
  try {
    const { starId } = req.body;
    const userId = req.user.userId;

    // Vérifier si l'étoile existe déjà dans la liste de souhaits
    const existingWishlistItem = await Wishlist.findOne({ where: { userId, starId } });
    if (existingWishlistItem) {
      return res.status(200).json({ message: "Star already in wishlist" });
    }

    await Wishlist.create({ userId, starId });

    // Récupérer la liste de souhaits mise à jour
    const updatedWishlist = await Wishlist.findAll({
      where: { userId },
      include: [Star],
    });

    res.status(201).json({ message: "Star added to wishlist", wishlist: updatedWishlist });
  } catch (error) {
    next(new AppError(`Error adding to wishlist: ${error.message}`, 400));
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { userId: req.user.userId },
      include: [Star],
    });
    res.json(wishlist);
  } catch (error) {
    next(new AppError(`Error fetching wishlist: ${error.message}`, 500));
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { starId } = req.params;
    const userId = req.user.userId;

    const wishlistItem = await Wishlist.findOne({
      where: { userId, starId }
    });

    if (!wishlistItem) {
      return next(new AppError("Star not found in wishlist", 404));
    }

    await wishlistItem.destroy();

    // Récupérer la liste de souhaits mise à jour
    const updatedWishlist = await Wishlist.findAll({
      where: { userId },
      include: [Star],
    });

    res.json({ message: "Star removed from wishlist", wishlist: updatedWishlist });
  } catch (error) {
    next(new AppError(`Error removing star from wishlist: ${error.message}`, 400));
  }
};

module.exports = exports;