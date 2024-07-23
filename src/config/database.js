// config/database.js

require("dotenv").config();
const testConfig = require("./database.test.config");

const defaultConfig = {
  dialect: "postgres",
  logging: false,
  define: {
    underscored: true,
    timestamps: true,
  },
};

module.exports = {
  development: {
    ...defaultConfig,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "stella_dev",
    host: process.env.DB_HOST || "localhost",
  },
  test: {
    ...defaultConfig,
    ...testConfig.test,
  },
  production: {
    ...defaultConfig,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
