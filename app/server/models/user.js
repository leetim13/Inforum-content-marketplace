'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models['Post']);
    }
  };
  User.init({
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
    profilePicture: {
      type: Sequelize.BLOB('long'),
      allowNull: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    gender: {
      type: Sequelize.ENUM(
        "Male",
        "Female",
        "Other"
      ),
      allowNull: false,
    },
    connectionDemographic: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}
    },
    rewardPoint: {
      type:  Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    role: {
      type: Sequelize.ENUM(
        "Admin",
        "User"
      ),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};