// src/models/index.js

const { Sequelize } = require("sequelize");
const config = require("../config/database.js");

const sequelize = new Sequelize(config.development);

const Star = require("./Star.js")(sequelize, Sequelize.DataTypes);
const User = require("./User.js")(sequelize, Sequelize.DataTypes);
const Order = require("./Order")(sequelize, Sequelize.DataTypes);

User.hasMany(Order);
Order.belongsTo(User);

const OrderStar = sequelize.define("OrderStar", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Order.belongsToMany(Star, { through: OrderStar });
Star.belongsToMany(Order, { through: OrderStar });

module.exports = {
  sequelize,
  Star,
  User,
  Order,
  OrderStar,
};
