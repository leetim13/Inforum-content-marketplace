'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      userId: 1,
      campaignId: 1,
      url: "http://www.abc.com",
      socialMedia: "Facebook",
      createdAt: new Date(),
      updatedAt: new Date()
  }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
