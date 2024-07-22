const { sequelize } = require('./src/models');

global.beforeAll(async () => {
  console.log('Syncing database...');
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
    throw error;
  }
});

global.afterAll(async () => {
  console.log('Closing database connection...');
  try {
    await sequelize.close();
    console.log('Database connection closed successfully');
  } catch (error) {
    console.error('Failed to close database connection:', error);
    throw error;
  }
});

global.sequelize = sequelize;