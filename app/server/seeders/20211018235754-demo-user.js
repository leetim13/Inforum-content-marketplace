'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: "Johnusername",
      password: "Johnpassword",
      firstName: "John",
      lastName: "Doe",
      profilePicture: null,
      age: 20,
      gender: 'Male',
      rewardPoint: 10,
      role: "Admin",
      connectionDemographic: {},
      email: 'john@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
  }], {}, { connectionDemographic: { type: new Sequelize.JSON() } });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
