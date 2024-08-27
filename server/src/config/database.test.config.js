// src/config/database.test.config.js

module.exports = {
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    define: {
      timestamps: false,
    },
  },
};
