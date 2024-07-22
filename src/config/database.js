// config/database.js
require('dotenv').config({ path: '../../.env' });
const testConfig = require('./database.test.config');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: testConfig.test
};