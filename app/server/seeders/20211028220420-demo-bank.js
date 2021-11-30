'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [{
      id: 1000000001,
      logo: null,
      name: "RBC",
      url: "https://www.rbcroyalbank.com/personal.html",
      username: "rbc",
      password: "rbc",
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    id: 1000000002,
    logo: null,
    name: "TD",
    url: "https://www.td.com/ca/en/personal-banking/",
    username: "td",
    password: "td",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 1000000003,
    logo: null,
    name: "BMO",
    url: "https://www.bmo.com/main/personal",
    username: "bmo",
    password: "bmo",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 1000000004,
    logo: null,
    name: "CIBC",
    url: "https://www.cibc.com/en/personal-banking.html",
    username: "cibc",
    password: "cibc",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 1000000005,
    logo: null,
    name: "Scotia Bank",
    url: "https://www.scotiabank.com/ca/en/personal.html",
    username: "scotia",
    password: "scotia",
    createdAt: new Date(),
    updatedAt: new Date()
  },
]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banks', null, {});
  }
};
