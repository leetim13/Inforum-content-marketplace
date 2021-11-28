'use strict';

const campaignObject = (id, title, BankId, type) => {
  return {
    id: id + 1000000000,
    BankId,
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
    [campaignObject(1, 'Get a credit card', 1000000001, 'Product'), 
    campaignObject(2, 'Help plant a tree.', 1000000001, 'Charity'), 
    campaignObject(3, 'Our bank did this amazing *** today!', 1000000002, 'Other'),
    campaignObject(4, 'Get your TFSA today!', 1000000001, 'Product'),
    campaignObject(5, 'Start a new credit card for $600!', 1000000002, 'Product'),
    campaignObject(6, 'Student account for $0 annual fee!', 1000000001, 'Product'),
    campaignObject(7, 'Our bank contributed $5B to solve world hunger!', 1000000002, 'Charity')]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
