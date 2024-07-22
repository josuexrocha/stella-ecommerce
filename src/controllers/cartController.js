// src/controllers/cartController.js

const { Cart, CartItem, Star } = require('../models');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.userId },
      include: [{ model: CartItem, include: [Star] }]
    });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { starId, quantity } = req.body;
    let cart = await Cart.findOne({ where: { userId: req.user.userId } });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.userId });
    }
    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, starId },
      defaults: { quantity }
    });
    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }
    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(400).json({ message: "Error adding item to cart", error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    const cartItem = await CartItem.findOne({
      where: { id: cartItemId, '$cart.userId$': req.user.userId },
      include: [Cart]
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: "Cart item updated", cartItem });
  } catch (error) {
    res.status(400).json({ message: "Error updating cart item", error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const result = await CartItem.destroy({
      where: { id: cartItemId, '$cart.userId$': req.user.userId },
      include: [Cart]
    });
    if (result === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(400).json({ message: "Error removing item from cart", error: error.message });
  }
};