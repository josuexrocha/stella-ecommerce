// jest.setup.js

const { sequelize } = require('./src/models');

global.beforeAll(async () => {
  await sequelize.sync({ force: true });
});

global.afterAll(async () => {
  // Vérifiez si la connexion est toujours ouverte avant de la fermer
  if (sequelize && sequelize.connectionManager.hasOwnProperty('connections') && sequelize.connectionManager.connections.sqlite) {
    await sequelize.close();
  }
});

global.sequelize = sequelize;