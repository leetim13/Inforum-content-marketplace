'use strict';

const postObject = (id, UserId, CampaignId) => {
  return {
    id: id + 1000000000,
    UserId: UserId + 1000000000,
    CampaignId: CampaignId + 1000000000,
    url: "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=100074732435890" + id,
    socialMedia: "facebook",
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts',
     [{
      id: 1 + 1000000000,
      UserId: 1 + 1000000000,
      CampaignId: 1 + 1000000000,
      url: "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=100074732435890",
      socialMedia: "facebook",
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
      postObject(2, 2, 1), 
      postObject(3, 3, 1),
      postObject(4, 4, 1),
      postObject(5, 5, 1),
      postObject(6, 6, 1),
      postObject(7, 7, 1),
      postObject(8, 8, 1),
      postObject(9, 9, 1),
      postObject(10, 10, 1)
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
