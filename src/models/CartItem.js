module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "CartItems",
    }
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cartId",
      onDelete: "CASCADE",
    });
    CartItem.belongsTo(models.Star, {
      foreignKey: "starId",
    });
  };

  return CartItem;
};
