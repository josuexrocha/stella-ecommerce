// src/models/Order.js

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM("pending", "paid", "shipped", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      timestamps: true,
    },
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "UserId", targetKey: "id" });
    Order.belongsToMany(models.Star, { through: models.OrderStar, foreignKey: "orderId" });
    Order.hasMany(models.OrderStar, { foreignKey: "orderId" });
  };

  return Order;
};