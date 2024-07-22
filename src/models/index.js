// src/models/index.js

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const config =
  process.env.NODE_ENV === "test"
    ? require("../config/database.test.config.js").test
    : require("../config/database.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

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

const OrderStar = sequelize.define("OrderStar", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

models.Order.belongsToMany(models.Star, { through: OrderStar });
models.Star.belongsToMany(models.Order, { through: OrderStar });

module.exports = {
  sequelize,
  ...models,
  OrderStar,
};
