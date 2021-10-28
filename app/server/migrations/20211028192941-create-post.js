'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        references: {
          model: 'Users',
          key: 'userId'
        },
        type: Sequelize.INTEGER
      },
      campaignId: {
        references: {
          model: 'Campaigns',
          key: 'campaignId'
        },
        type: Sequelize.INTEGER
      },
      postUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      numClicks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        defaultValue: 0
      },
      numLikes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        defaultValue: 0
      },
      numComments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        defaultValue: 0
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true
        },
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
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};
