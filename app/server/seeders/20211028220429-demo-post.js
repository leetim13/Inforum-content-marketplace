'use strict';

const postObject = (id, userId, campaignId) => {
  return {
    userId,
    campaignId,
    url: "https://www.facebook.com/rbc/posts/688775238456992" + id,
    socialMedia: "facebook",
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [postObject(1, 1000000001, 1000000001), postObject(2, 1000000002, 1000000001), postObject(3, 1000000002, 1000000002)]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
