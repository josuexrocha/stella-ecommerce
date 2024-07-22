// app.js

const express = require("express");
const { sequelize } = require("./src/models");
const { errorHandler, AppError } = require("./src/middlewares/errorHandler");

const starsRoutes = require("./src/routes/starsRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const ordersRoutes = require("./src/routes/ordersRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/api/stars", starsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);

// Gestion des erreurs 404
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Gestion globale des erreurs
app.use(errorHandler);

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
