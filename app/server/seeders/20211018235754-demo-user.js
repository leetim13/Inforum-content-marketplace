'use strict';

const { sequelize } = require("../models");

const userObject = (id, role) => {
  const tmp = role.toLowerCase() + id;
  return {
    id,
    username: tmp,
    password: tmp,
    firstName: tmp,
    lastName: tmp,
    profilePicture: null,
    age: 20,
    gender: 'Male',
    rewardPoint: 10,
    role: role,
    connectionDemographic: {},
    email: tmp + '@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [userObject(1, "User"), userObject(2, "User"), userObject(3, "Admin")], {}, { connectionDemographic: { type: new Sequelize.JSON() } });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
