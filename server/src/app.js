// app.js

require("dotenv").config();
const express = require("express");
const { json, urlencoded } = express;
const expressStatic = express.static;
const morgan = require("morgan");
const { join } = require("node:path");
const cors = require("cors");
const { sequelize } = require("./models");
const { errorHandler, AppError } = require("./middlewares/errorHandler");
const routes = require("./routes");
const { NODE_ENV, PORT: _PORT } = require("./config/config");
const { info, error: _error } = require("./utils/logger");
const { serve, setup } = require("./utils/swagger");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

const app = express();

// Helmet before other middlewares
app.use(helmet());

// Ajouter cookie-parser pour lire/écrire les cookies
app.use(cookieParser());

// Ajouter le middleware CSRF
app.use(csurf({ cookie: true }));

// Middleware pour ajouter le token CSRF aux réponses
app.use((req, res, next) => {
  const csrfToken = req.csrfToken(); // Génère un nouveau token
  res.cookie("XSRF-TOKEN", csrfToken, { httpOnly: false }); // Partage le token CSRF avec le frontend
  next();
});

// Gérer les erreurs CSRF
app.use((err, _req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  next(err);
});

// CORS configuration
const corsOptions = {
	origin: "http://localhost:3001",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Logging middleware
if (NODE_ENV !== "test") {
	app.use(
		morgan("combined", {
			stream: { write: (message) => info(message.trim()) },
		}),
	);
}

// Middleware to parse JSON
app.use(json());

// Middleware to parse form data
app.use(urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", serve, setup);

app.use(expressStatic(join(__dirname, "public")));

// Centralized API routes
app.use("/api", routes);

// Route to handle all non-API requests
app.get("*", (_, res) => {
	res.sendFile(join(__dirname, "public", "index.html"));
});

// Handle 404 errors for the API
app.use("/api", (req, _, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling
app.use(errorHandler);

const PORT = _PORT || 3000;

// Function to start the server
const startServer = async () => {
	try {
		await sequelize.sync({ force: false });
		info("Database synced");
		info(`Connected to database: ${sequelize.config.database}`);

		app.listen(PORT, () => {
			info(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
		});
	} catch (error) {
		_error("Unable to start server:", error);
		process.exit(1);
	}
};

if (require.main === module) {
	startServer();
}

module.exports = app;
