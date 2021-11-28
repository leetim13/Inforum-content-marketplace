'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bank.hasMany(models['Campaign']);
    }
  };
  Bank.init({
    logo: {
      type: Sequelize.BLOB("long"),
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cash: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      },
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Bank',
  });
  return Bank;
};