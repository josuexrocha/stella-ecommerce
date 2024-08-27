// src/models/OrderStar.js
module.exports = (sequelize, DataTypes) => {
  const OrderStar = sequelize.define("OrderStar", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  OrderStar.associate = (models) => {
    OrderStar.belongsTo(models.Order);
    OrderStar.belongsTo(models.Star);
  };

  return OrderStar;
};
