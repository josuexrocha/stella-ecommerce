// models/Wishlist.js
module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User);
    Wishlist.belongsTo(models.Star);
  };

  return Wishlist;
};