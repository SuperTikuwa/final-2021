"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class counts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  counts.init(
    {
      book_id: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "counts",
    }
  );

  return counts;
};
