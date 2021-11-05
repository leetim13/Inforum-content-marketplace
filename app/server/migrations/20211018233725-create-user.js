'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        allowNull: false
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
        allowNull: false
      },
      rewardPoint: {
        type:  Sequelize.INTEGER,
        defaultValue: 0,
        min: 0
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};