// app.js

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { sequelize } = require("./models");
const { errorHandler, AppError } = require("./middlewares/errorHandler");
const routes = require("./routes");
const config = require("./config/config");
const logger = require("./utils/logger");
const swaggerDocs = require("./utils/swagger");
const { authenticateUser } = require("./middlewares/authMiddleware");

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

// Middleware pour parser les données de formulaire
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerDocs.serve, swaggerDocs.setup);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Appliquer le middleware d'authentification à toutes les routes API
app.use("/api", authenticateUser);

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
