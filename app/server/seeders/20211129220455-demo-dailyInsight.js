'use strict';

const dailyInsightObject = (id, PostId, date, numClicks,
                            numLikes, numComments) => {
  return {
    id: id + 1000000000,
    PostId: PostId + 1000000000,
    date,
    numClicks: 0,
    numLikes: 0,
    numComments,
    rewardPoints: numClicks,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}



module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DailyInsights',
    [
    dailyInsightObject(1, 1, new Date(new Date().setDate(new Date().getDate()-5)), 10, 1, 0), 
    dailyInsightObject(2, 1, new Date(new Date().setDate(new Date().getDate()-4)), 15, 2, 0), 
    dailyInsightObject(3, 1, new Date(new Date().setDate(new Date().getDate()-3)), 20, 3, 0),
    dailyInsightObject(4, 1, new Date(new Date().setDate(new Date().getDate()-2)), 25, 4, 0),
    dailyInsightObject(5, 1, new Date(new Date().setDate(new Date().getDate()-1)), 30, 5, 0),
    dailyInsightObject(6, 2, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0), 
    dailyInsightObject(7, 3, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    dailyInsightObject(8, 4, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    dailyInsightObject(9, 5, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    dailyInsightObject(10, 6, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    dailyInsightObject(11, 7, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    dailyInsightObject(12, 8, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    dailyInsightObject(13, 9, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    dailyInsightObject(14, 10, new Date(new Date().setDate(new Date().getDate())), 20, 2, 0),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DailyInsights', null, {});
  }
};
