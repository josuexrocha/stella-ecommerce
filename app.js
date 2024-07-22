// app.js

const express = require("express");
const { sequelize } = require("./src/models");
const { errorHandler, AppError } = require("./src/middlewares/errorHandler");
const routes = require("./src/routes");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes centralisées
app.use("/api", routes);

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
