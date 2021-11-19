'use strict';

const campaignObject = (id, bankId, type) => {
  return {
    id,
    bankId,
    type,
    url: "https://discover.rbcroyalbank.com/smallbusinessredefined-roundup-6-common-themes-of-resilient-businesses/",
    description: "Inviting you to share this me.",
    image: null,
    startDate: new Date(),
    endDate: new Date(),
    allocatedCash: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Campaigns', [campaignObject(1, 1, 'Product'), campaignObject(2, 1, 'Charity'), campaignObject(3, 2, 'Other')]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
