// scripts/createTables.js
const { sequelize } = require("../server/src/models");

async function createTables() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
}

if (require.main === module) {
  createTables().then(() => sequelize.close());
}

module.exports = createTables;
