const { sequelize } = require('../src/models');

async function createTables() {
  try {
    await sequelize.sync({ force: true });
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await sequelize.close();
  }
}

createTables();