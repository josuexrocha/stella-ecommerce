// src/models/CartItem.js
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart);
    CartItem.belongsTo(models.Star);
  };

  return CartItem;
};
