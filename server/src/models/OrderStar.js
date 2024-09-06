// models/OrderStar.js
module.exports = (sequelize, DataTypes) => {
  const OrderStar = sequelize.define("OrderStar", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'order_stars',
    timestamps: true
  });

  OrderStar.associate = (models) => {
    OrderStar.belongsTo(models.Order, { foreignKey: 'OrderId' });
    OrderStar.belongsTo(models.Star, { foreignKey: 'StarId' });
  };

  return OrderStar;
};
