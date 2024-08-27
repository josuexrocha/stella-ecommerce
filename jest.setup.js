// jest.setup.js

const { sequelize, User } = require("./src/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let isDBSynced = false;
let token;
let userId;

global.beforeAll(async () => {
  if (!isDBSynced) {
    console.log("Syncing database...");
    try {
      await sequelize.sync({ force: true });
      console.log("Database synced successfully");

      // Create a test user and generate a token
      const hashedPassword = await bcrypt.hash("testpassword", 10);
      const user = await User.create({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: hashedPassword,
      });
      userId = user.id;

      token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      isDBSynced = true;
    } catch (error) {
      console.error("Failed to sync database:", error);
      throw error;
    }
  }
});

global.beforeEach(async () => {
  console.log("Clearing database before test...");
  try {
    await Promise.all(
      Object.values(sequelize.models).map((model) =>
        model.destroy({ truncate: true, force: true }),
      ),
    );
    console.log("Database cleared successfully");
  } catch (error) {
    console.error("Failed to clear database:", error);
    throw error;
  }
});

global.afterAll(async () => {
  console.log("Closing database connection...");
  try {
    await sequelize.close();
    console.log("Database connection closed successfully");
  } catch (error) {
    console.error("Failed to close database connection:", error);
    // Ne pas lever l'erreur ici, juste la logger
  }
});

global.token = token;
global.userId = userId;
global.sequelize = sequelize;
