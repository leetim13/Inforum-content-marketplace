'use strict';

const campaignObject = (id, title, bankId, type) => {
  return {
    id,
    bankId,
    type,
    title,
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
    return queryInterface.bulkInsert('Campaigns', 
    [campaignObject(1, 'Get a credit card', 1, 'Product'), 
    campaignObject(2, 'Help plant a tree.', 1, 'Charity'), 
    campaignObject(3, 'Our bank did this amazing *** today!', 2, 'Other'),
    campaignObject(4, 'Get your TFSA today!', 1, 'Product'),
    campaignObject(5, 'Start a new credit card for $600!', 2, 'Product'),
    campaignObject(6, 'Student account for $0 annual fee!', 1, 'Product'),
    campaignObject(7, 'Our bank contributed $5B to solve world hunger!', 2, 'Charity')]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
