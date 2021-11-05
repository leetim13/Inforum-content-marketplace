'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [{
      logo: null,
      name: "RBC",
      url: "https://www.rbcroyalbank.com/personal.html",
      username: "rbc",
      password: "rbc",
      createdAt: new Date(),
      updatedAt: new Date()
  }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
