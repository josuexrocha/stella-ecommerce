// models/OrderStar.js
module.exports = (sequelize, DataTypes) => {
  const OrderStar = sequelize.define("OrderStar", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'order_stars',
    timestamps: true
  });

  OrderStar.associate = (models) => {
    OrderStar.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderStar.belongsTo(models.Star, { foreignKey: 'starId' });
  };

  return OrderStar;
};