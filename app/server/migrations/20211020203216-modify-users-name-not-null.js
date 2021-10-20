'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.changeColumn('Users', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      }
  })
  }
};
