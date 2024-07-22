// models/Review.js
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User);
    Review.belongsTo(models.Star);
  };

  return Review;
};
