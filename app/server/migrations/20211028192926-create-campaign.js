'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Campaigns', {
      campaignId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bank: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Campaigns');
  }
};
