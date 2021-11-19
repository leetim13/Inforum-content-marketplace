'use strict';

const postObject = (id, userId, campaignId) => {
  return {
    id,
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
    return queryInterface.bulkInsert('Posts', [postObject(1, 1, 1), postObject(2, 2, 1), postObject(3, 2, 2)]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
