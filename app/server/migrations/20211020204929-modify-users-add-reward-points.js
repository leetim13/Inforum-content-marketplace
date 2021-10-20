'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.addColumn('Users', 'rewardPoint', {
        type: Sequelize.INTEGER,
        min: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'rewardPoint', {});
  }
};
