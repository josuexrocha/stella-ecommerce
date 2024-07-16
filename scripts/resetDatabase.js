const { sequelize } = require('../src/models');
const createTables = require('./createTables');
const generateSampleData = require('./sampleData');

async function resetDatabase() {
  try {
    await createTables();
    await generateSampleData();
    console.log('Database reset and populated with sample data successfully.');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();