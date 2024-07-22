const express = require("express");
const { sequelize } = require("./src/models");

const starsRoutes = require("./src/routes/starsRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const ordersRoutes = require("./src/routes/ordersRoutes");
const cartRoutes = require("./src/routes/cartRoutes");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/api/stars", starsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/cart", cartRoutes);

// Gestion des erreurs 404
app.use((req, res, _next) => {
  res.status(404).json({ message: "Route not found" });
});

// Gestion globale des erreurs
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    await sequelize.sync({ force: false }); // Utilisez { force: true } seulement en développement
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

// Si ce fichier est exécuté directement (pas importé comme un module)
if (require.main === module) {
  startServer();
}

module.exports = app; // Pour les tests unitaires
