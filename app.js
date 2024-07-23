const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { sequelize } = require("./src/models");
const { errorHandler, AppError } = require("./src/middlewares/errorHandler");
const routes = require("./src/routes");
const config = require("./src/config/config");
const logger = require("./src/utils/logger");
const swagger = require('./src/utils/swagger');


const app = express();

// Logging middleware
if (config.NODE_ENV !== "test") {
  app.use(
    morgan("combined", {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );
}

// Middleware pour parser le JSON
app.use(express.json());

// Swagger UI
app.use('/api-docs', swagger.serve, swagger.setup);

// Middleware pour parser les données de formulaire
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Routes API centralisées
app.use("/api", routes);

// Route pour gérer toutes les requêtes non-API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Gestion des erreurs 404 pour l'API
app.use("/api", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Gestion globale des erreurs
app.use(errorHandler);

const PORT = config.PORT || 3000;

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(
        `Server is running in ${config.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
