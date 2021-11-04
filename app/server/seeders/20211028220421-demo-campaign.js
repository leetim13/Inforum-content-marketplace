'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Campaigns', [{
      bank: "RBC",
      offerType: "credit card",
      expirationDate: new Date(),
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
  }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
