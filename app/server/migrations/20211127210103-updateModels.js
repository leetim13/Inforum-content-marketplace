'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Campaigns', 'title', { type: Sequelize.STRING, allowNull: false, defaultValue: 'No title.' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Campaigns', 'title', {});
  }
};
