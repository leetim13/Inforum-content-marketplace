'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Campaigns', [{
      bankId: 1,
      type: "Product",
      url: "https://www.facebook.com/ho.ho.hotwheels/posts/3522352571114933",
      description: "Inviting you to play with me.",
      image: null,
      startDate: new Date(),
      endDate: new Date(),
      allocatedCash: 100,
      createdAt: new Date(),
      updatedAt: new Date()
  }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
