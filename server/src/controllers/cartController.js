// src/controllers/cartController.js

const { Cart, CartItem, Star } = require("../models");
const { AppError } = require("../middlewares/errorHandler");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.userId },
      include: [
        {
          model: CartItem,
          as: "cartItems",
          include: [Star],
        },
      ],
    });
    res.json(cart || { cartItems: [] });
  } catch (error) {
    next(new AppError(`Error fetching cart: ${error.message}`, 500));
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { starId, quantity } = req.body;
    let cart = await Cart.findOne({ where: { userId: req.user.userId } });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.userId });
    }
    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, starId },
      defaults: { quantity },
    });
    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }
    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    next(new AppError(`Error adding item to cart: ${error.message}`, 400));
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { cartItemId, quantity } = req.body;

    // D'abord, trouvez le panier de l'utilisateur
    const cart = await Cart.findOne({ where: { userId: req.user.userId } });

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    // Ensuite, trouvez l'élément du panier
    const cartItem = await CartItem.findOne({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    if (!cartItem) {
      return next(new AppError("Cart item not found", 404));
    }

    // Mettez à jour la quantité
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Cart item updated", cartItem });
  } catch (error) {
    next(new AppError(`Error updating cart item: ${error.message}`, 400));
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;

    // D'abord, trouvez le panier de l'utilisateur
    const cart = await Cart.findOne({ where: { userId: req.user.userId } });

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    // Ensuite, trouvez et supprimez l'élément du panier
    const result = await CartItem.destroy({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    if (result === 0) {
      return next(new AppError("Cart item not found", 404));
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    next(new AppError(`Error removing item from cart: ${error.message}`, 400));
  }
};
