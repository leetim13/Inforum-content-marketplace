'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Campaign.init({
    bankId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Banks',
        key: 'id'
      },
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM(
        "Charity",
        "Article",
        "Product",
        "Other"
      ),
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.BLOB("long"),
      allowNull: true
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    allocatedCash: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      },
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};