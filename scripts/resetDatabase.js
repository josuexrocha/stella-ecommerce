// scripts/resetDatabase.js
const { sequelize } = require("../server/src/models");
const createTables = require("./createTables");
const generateSampleData = require("./sampleData");

async function resetDatabase() {
  try {
    await createTables();
    await generateSampleData();
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  resetDatabase();
}

module.exports = resetDatabase;
