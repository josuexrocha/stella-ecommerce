const { sequelize, Star, User, Order } = require('../src/models');
const faker = require('faker');

async function generateSampleData() {
  try {
    // Générer des étoiles
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        name: faker.name.firstName() + " Star",
        description: faker.lorem.sentence(),
        constellation: faker.random.word(),
        distanceFromEarth: faker.datatype.float({ min: 1, max: 1000 }),
        luminosity: faker.datatype.float({ min: 0.1, max: 1000000 }),
        mass: faker.datatype.float({ min: 0.1, max: 50 }),
        magnitude: faker.datatype.float({ min: -26, max: 15 }),
        price: faker.commerce.price(1000, 100000, 2)
      });
    }
    await Star.bulkCreate(stars);

    // Générer des utilisateurs
    const users = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: i === 0 ? 'admin' : 'client'
      });
    }
    await User.bulkCreate(users);

    // Générer des commandes
    const orders = [];
    for (let i = 0; i < 30; i++) {
      orders.push({
        userId: faker.datatype.number({ min: 1, max: 20 }),
        date: faker.date.past(),
        status: faker.random.arrayElement(['pending', 'paid', 'shipped', 'cancelled']),
        totalAmount: faker.commerce.price(1000, 500000, 2)
      });
    }
    await Order.bulkCreate(orders);

    console.log('Sample data generated successfully');
  } catch (error) {
    console.error('Error generating sample data:', error);
  } finally {
    await sequelize.close();
  }
}

generateSampleData();