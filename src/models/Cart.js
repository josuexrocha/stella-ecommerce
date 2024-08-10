// src/models/Cart.js

module.exports = (sequelize, _DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      // Aucun champ défini explicitement ici
    },
    {
      tableName: "Carts",
      timestamps: true,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Cart.hasMany(models.CartItem, {
      foreignKey: "cartId",
      as: "cartItems",
      onDelete: "CASCADE",
    });
  };

  Cart.prototype.getTotalPrice = async function () {
    let total = 0;
    const cartItems = await this.getCartItems();
    for (let item of cartItems) {
      total += item.quantity * item.Star.price;
    }
    return total;
  };

  return Cart;
};
