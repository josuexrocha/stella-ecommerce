const express = require("express");
const path = require("path");
const { sequelize } = require("./src/models");
const { errorHandler, AppError } = require("./src/middlewares/errorHandler");
const routes = require("./src/routes");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes API centralisées
app.use("/api", routes);

// Route pour gérer toutes les requêtes non-API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion des erreurs 404 pour l'API
app.use('/api', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Gestion globale des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;