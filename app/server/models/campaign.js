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
    offerType: {
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
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    image: {
      type: Sequelize.BLOB("long"),
      allowNull: true
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    allocatedCash: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};