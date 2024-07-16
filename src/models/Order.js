// models/Order.js

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    });

    return Order;
  };