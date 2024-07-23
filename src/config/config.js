// src/config/config.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Vous pouvez ajouter d'autres configurations globales ici
};