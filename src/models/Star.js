// models/Star.js

module.exports = (sequelize, DataTypes) => {
  const Star = sequelize.define("Star", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    constellation: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    distanceFromEarth: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    luminosity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mass: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    magnitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Star;
};
