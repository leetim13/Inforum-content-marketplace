'use strict';
const fs = require('fs');

// fs.readFile('./resources/TD-credit-card.jpeg', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

var image = fs.readFileSync('./resources/TD-credit-card.jpeg', 'base64')
// console.log (image);

// decode the image as decoded.png for testing (decoding works!)
// let buff = new Buffer(image, 'base64');
// fs.writeFileSync('decoded.png', buff);
// console.log('Base64 image data converted to file: decoded.png');

const campaignObject = (id, title, BankId, type, image) => {
  return {
    id: id + 1000000000,
    BankId,
    type,
    title,
    url: "https://discover.rbcroyalbank.com/smallbusinessredefined-roundup-6-common-themes-of-resilient-businesses/",
    description: "Inviting you to share this me.",
    image,
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
    [
    campaignObject(1, 'Get a credit card', 1000000001, 'Product', image), 
    campaignObject(2, 'Help plant a tree.', 1000000001, 'Charity', image), 
    campaignObject(3, 'Our bank did this amazing *** today!', 1000000002, 'Other', image), 
    campaignObject(4, 'Get your TFSA today!', 1000000001, 'Product', image), 
    campaignObject(5, 'Start a new credit card for $600!', 1000000002, 'Product', image), 
    campaignObject(6, 'Student account for $0 annual fee!', 1000000001, 'Product', image), 
    campaignObject(7, 'Our bank contributed $5B to solve world hunger!', 1000000002, 'Charity', image)]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
