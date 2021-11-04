'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: "Johnusername",
      password: "Johnpassword",
      firstName: "John",
      lastName: "Doe",
      age: 20,
      gender: 'Male',
      country: 'Canada',
      rewardPoint: 10,
      role: "Admin",
      email: 'john@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
  }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
