// src/controllers/wishlistController.js
const { Wishlist, Star } = require("../models");
const { AppError } = require("../middlewares/errorHandler");

exports.addToWishlist = async (req, res, next) => {
  try {
    const { starId } = req.body;
    const userId = req.user.userId;

    // Vérifier si l'étoile existe déjà dans la liste de souhaits
    const existingWishlistItem = await Wishlist.findOne({ where: { userId, starId } });
    if (existingWishlistItem) {
      return res.status(200).json({ message: "L'étoile est déjà dans la liste de souhaits" });
    }

    // Ajouter l'étoile à la liste de souhaits
    await Wishlist.create({ userId, starId });

    // Récupérer l'étoile ajoutée pour l'inclure dans la réponse
    const addedStar = await Star.findByPk(starId);

    res.status(201).json({
      message: "L'étoile a été ajoutée à la liste de souhaits",
      wishlistItem: addedStar ? addedStar.toJSON() : null, // Utiliser .toJSON() pour éviter les structures circulaires
    });
  } catch (error) {
    next(new AppError(`Erreur lors de l'ajout à la liste de souhaits: ${error.message}`, 400));
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Récupérer la liste de souhaits de l'utilisateur
    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: Star,
          attributes: ["starid", "name", "price", "constellation"], // Limiter les attributs renvoyés
        },
      ],
    });

    // Transformer la liste en un format simple sans référence circulaire
    const wishlistItems = wishlist.map((item) => item.toJSON());

    res.json({
      message: "Liste de souhaits récupérée avec succès",
      wishlist: wishlistItems,
    });
  } catch (error) {
    next(
      new AppError(`Erreur lors de la récupération de la liste de souhaits: ${error.message}`, 500),
    );
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { starId } = req.params;
    const userId = req.user.userId;

    // Trouver l'article de la liste de souhaits
    const wishlistItem = await Wishlist.findOne({
      where: { userId, starId },
    });

    if (!wishlistItem) {
      return next(new AppError("L'étoile n'a pas été trouvée dans la liste de souhaits", 404));
    }

    // Supprimer l'article de la liste de souhaits
    await wishlistItem.destroy();

    // Récupérer la liste mise à jour
    const updatedWishlist = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: Star,
          attributes: ["starid", "name", "price", "constellation"], // Limiter les attributs renvoyés
        },
      ],
    });

    // Transformer la liste mise à jour en un format simple sans référence circulaire
    const updatedWishlistItems = updatedWishlist.map((item) => item.toJSON());

    res.json({
      message: "L'étoile a été supprimée de la liste de souhaits",
      wishlist: updatedWishlistItems,
    });
  } catch (error) {
    next(
      new AppError(
        `Erreur lors de la suppression de l'étoile de la liste de souhaits: ${error.message}`,
        400,
      ),
    );
  }
};

module.exports = exports;
