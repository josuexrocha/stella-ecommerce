// src/models/Cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: "userId", // Utilisez 'userId' au lieu de la clé étrangère par défaut
      as: "user",
    });
    Cart.hasMany(models.CartItem);
  };

  return Cart;
};
