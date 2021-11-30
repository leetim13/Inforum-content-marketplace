'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DailyInsights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PostId: {
        references: {
          model: 'Posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      rewardPoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DailyInsights');
  }
};
