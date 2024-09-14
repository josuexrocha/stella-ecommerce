// jest.setup.js

const { sequelize, User } = require("./src/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let isDBSynced = false;
let token;
let userId;

global.beforeAll(async () => {
  if (!isDBSynced) {
    try {
      await sequelize.sync({ force: true });

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
  try {
    await Promise.all(
      Object.values(sequelize.models).map((model) =>
        model.destroy({ truncate: true, force: true }),
      ),
    );
  } catch (error) {
    console.error("Failed to clear database:", error);
    throw error;
  }
});

global.afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error("Failed to close database connection:", error);
  }
});

global.token = token;
global.userId = userId;
global.sequelize = sequelize;
