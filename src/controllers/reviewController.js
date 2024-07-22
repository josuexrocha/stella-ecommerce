// controllers/reviewController.js
const { Review, Order, Star } = require("../models");

exports.addReview = async (req, res) => {
  try {
    const { starId, rating, comment } = req.body;
    // Vérifier si l'utilisateur a acheté l'étoile
    const order = await Order.findOne({
      where: { UserId: req.user.userId },
      include: [
        {
          model: Star,
          where: { id: starId },
        },
      ],
    });
    if (!order) {
      return res
        .status(403)
        .json({ message: "You can only review stars you've purchased" });
    }
    const review = await Review.create({
      userId: req.user.userId,
      starId,
      rating,
      comment,
    });
    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding review", error: error.message });
  }
};
