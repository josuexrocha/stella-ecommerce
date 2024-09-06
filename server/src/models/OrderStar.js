// src/models/OrderStar.js
module.exports = (sequelize, DataTypes) => {
  const OrderStar = sequelize.define("OrderStar", {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'order_id'
    },
    starId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'star_id'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  }, {
    tableName: "order_stars",
    timestamps: true,
  });

  OrderStar.associate = (models) => {
    OrderStar.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderStar.belongsTo(models.Star, { foreignKey: 'starId' });
  };

  return OrderStar;
};
