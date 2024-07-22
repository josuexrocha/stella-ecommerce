// controllers/wishlistController.js
const { Wishlist, Star } = require("../models");

exports.addToWishlist = async (req, res) => {
  try {
    const { starId } = req.body;
    await Wishlist.create({ userId: req.user.userId, starId });
    res.status(201).json({ message: "Star added to wishlist" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding to wishlist", error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { userId: req.user.userId },
      include: [Star],
    });
    res.json(wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: error.message });
  }
};
