'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      campaignId: {
        references: {
          model: 'Campaigns',
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true
        }
      },
      numClicks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      numLikes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      numComments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      socialMedia: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
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
    await queryInterface.dropTable('Posts');
  }
};
