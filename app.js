// app.js

const express = require("express");
const { sequelize } = require("./src/models");
const initializeData = require("./src/utils/initializeData");

const starsRoutes = require("./src/routes/starsRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const ordersRoutes = require("./src/routes/ordersRoutes");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/api/stars", starsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;

// Synchronisation de la base de données et démarrage du serveur
sequelize
  .sync({ force: true }) // Utilisez { force: true } seulement en développement
  .then(() => {
    console.log("Database synced");
    return initializeData();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });

module.exports = app; // Pour les tests unitaires si nécessaire
