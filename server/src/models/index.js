// src/models/index.js

const fs = require("node:fs");
const path = require("node:path");
const { Sequelize } = require("sequelize");
const config =
  process.env.NODE_ENV === "test"
    ? require("../config/database.test.config.js").test
    : require("../config/database.js").development;

const sequelize = new Sequelize({
  ...config,
  dialect: config.dialect,
  storage: config.storage,
});

const models = {};

// Charger automatiquement tous les modèles du dossier actuel
for (const file of fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js")) {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  models[model.name] = model;
}

// Appliquer les associations
for (const modelName of Object.keys(models)) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
}

// Définir les associations spécifiques
models.User.hasMany(models.Order);
models.Order.belongsTo(models.User);

models.User.hasMany(models.Review, { foreignKey: "userId" });
models.Star.hasMany(models.Review, { foreignKey: "starId" });

models.User.hasMany(models.Wishlist, { foreignKey: "userId" });
models.Star.hasMany(models.Wishlist, { foreignKey: "starId" });

// Définir les associations many-to-many
models.Order.belongsToMany(models.Star, { through: models.OrderStar });
models.Star.belongsToMany(models.Order, { through: models.OrderStar });

// Associations pour le panier
models.User.hasOne(models.Cart, {
  foreignKey: "userId",
  as: "cart",
});
models.Cart.belongsTo(models.User, {
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  ...models,
};
