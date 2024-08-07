// src/models/index.js

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const config =
  process.env.NODE_ENV === "test"
    ? require("../config/database.test.config.js").test
    : require("../config/database.js").development;

const sequelize = new Sequelize({
  ...config,
  dialect: config.dialect, // Ajoutez cette ligne
  storage: config.storage,
});

const models = {};

// Charger automatiquement tous les modèles du dossier actuel
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    models[model.name] = model;
  });

// Appliquer les associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Définir les associations spécifiques
models.User.hasMany(models.Order);
models.Order.belongsTo(models.User);

models.User.hasMany(models.Review, { foreignKey: "userId" });
models.Star.hasMany(models.Review, { foreignKey: "starId" });

models.User.hasMany(models.Wishlist, { foreignKey: "userId" });
models.Star.hasMany(models.Wishlist, { foreignKey: "starId" });

const OrderStar = sequelize.define("OrderStar", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

models.Order.belongsToMany(models.Star, { through: OrderStar });
models.Star.belongsToMany(models.Order, { through: OrderStar });

// Associations pour le panier
models.User.hasOne(models.Cart, {
  foreignKey: "userId",
  as: "cart",
});
models.Cart.belongsTo(models.User, {
  foreignKey: "userId",
});

models.Cart.hasMany(models.CartItem, {
  foreignKey: "cartId",
  as: "cartItems",
  onDelete: "CASCADE",
});
models.CartItem.belongsTo(models.Cart, {
  foreignKey: "cartId",
});

module.exports = {
  sequelize,
  ...models,
  OrderStar,
};
