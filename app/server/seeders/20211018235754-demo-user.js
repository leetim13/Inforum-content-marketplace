'use strict';

const { sequelize } = require("../models");

const userObject = (id, age, gender, role) => {
  const tmp = role.toLowerCase() + id;
  return {
    id: id + 1000000000,
    username: tmp,
    password: tmp,
    firstName: tmp,
    lastName: tmp,
    profilePicture: null,
    age: age,
    gender: gender,
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
    return queryInterface.bulkInsert('Users', 
    [ 
    userObject(999, 18, "Male", "Admin"),
    userObject(1, 18, "Male", "User"), 
    userObject(2, 28, "Male", "User"),
    userObject(3, 38, "Male", "User"),
    userObject(4, 48, "Male", "User"),
    userObject(5, 58, "Male", "User"),
    userObject(6, 20, "Female", "User"),
    userObject(7, 20, "Other", "User"),
    userObject(8, 28, "Female", "User"),
    userObject(9, 28, "Female", "User"),
    userObject(10, 18, "Male", "User"),
    userObject(100, 28, "Male", "User")
    ], {}, { connectionDemographic: { type: new Sequelize.JSON() } });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
