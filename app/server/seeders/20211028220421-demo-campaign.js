'use strict';
const fs = require('fs');
const longBefore = new Date();
longBefore.setUTCFullYear(longBefore.getUTCFullYear() - 1);

const longLater = new Date();
longLater.setUTCFullYear(longLater.getUTCFullYear() + 1);
const campaignObject = (id, title, description, url, BankId, type, image ) => {
  return {
    id: id + 1000000000,
    BankId: BankId + 1000000000,
    type,
    title,
    url,
    description,
    image,
    startDate: longBefore,
    endDate: longLater,
    allocatedCash: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

// encode images as base64 to store in db
var RBCarticleImg = fs.readFileSync('./resources/RBC-article.png', 'base64')
var RBCproductImg = fs.readFileSync('./resources/RBC-product.png', 'base64')
var RBCcharityImg = fs.readFileSync('./resources/RBC-charity.png', 'base64')
var RBCcharity2Img = fs.readFileSync('./resources/RBC-charity2.png', 'base64')
var TDproductImg = fs.readFileSync('./resources/TD-product.png', 'base64')
var TDcharityImg = fs.readFileSync('./resources/TD-charity.png', 'base64')
var TDarticleImg = fs.readFileSync('./resources/TD-article.png', 'base64')
var TDotherImg = fs.readFileSync('./resources/TD-other.png', 'base64')
var BMOarticleImg = fs.readFileSync('./resources/BMO-article.png', 'base64')
var CIBCcharityImg = fs.readFileSync('./resources/CIBC-charity.png', 'base64')
var ScotiaOtherImg = fs.readFileSync('./resources/scotia-other.png', 'base64')
var RBCproduct2Img = fs.readFileSync('./resources/rbc-airpods-demo.png', 'base64')

// use this for demo!
// var BMOcharityDemoImg = fs.readFileSync('./resources/BMO-charity-demo.png', 'base64')


// BankId's for seeders
// RBC: 1, TD: 2, BMO: 3, CIBC: 4, Scotia: 5

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Campaigns', 
    [
    campaignObject(1, 'RBC named Bank of the Year', 
    "RBC named ‘North American Retail Bank of the Year’ for third consecutive year.", 
    "https://www.rbc.com/our-company/0626-2020-rbc-named-north-american-retail-bank-of-the-year.html",
    1, 'Article', RBCarticleImg), 

    campaignObject(2, 'TD Credit Card Promotion', 
    "TD® Aeroplan® Visa Infinite*. Earn up to $1,250 in value in the first year.", 
    "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/",
    2, 'Product', TDproductImg), 

    campaignObject(3, 'BMO welcomes Apple Pay', 
    "Good news, BMO credit and debit card holders. Apple Pay has arrived in Canada.",
    "https://www.bmo.com/main/personal/credit-cards/apple-pay/",
    3, 'Article', BMOarticleImg), 

    campaignObject(4, 'First Up with RBCxMusic', 
    "RBC provides young artists with a platform for exposure, funding, & education.",
    "https://rbcxmusicfirstup.ca/",
    1, 'Charity', RBCcharityImg), 

    campaignObject(5, 'CIBC’s 2020 Sustainability Report', 
    "Sustainability is at the heart of CIBC’s purpose. Read the report here.",
    "https://www.cibc.com/content/dam/about_cibc/corporate_responsibility/pdfs/cibc-esg-2020-en.pdf",
    4, 'Charity', CIBCcharityImg), 

    campaignObject(6, 'Scotiabank: Be Mortgage-Free Faster',
    "Find out how changing the way you pay your mortgage can help you.",
    "https://www.youtube.com/watch?v=L_rIIH_p-HM&ab_channel=Scotiabank",
    5, 'Other', ScotiaOtherImg),

    campaignObject(7, 'RBC Account Promotion', 
    "Switch to RBC and get the Latest iPad at No Cost. Conditions Apply.",
    "https://www.rbcroyalbank.com/dms/pba/open-an-account/offer-n-or.html",
    1, 'Product', RBCproductImg),

    campaignObject(8, 'RBC’s 2020 ESG Report', 
    "“Creating a more inclusive, sustainable and prosperous future.”",
    "https://www.rbc.com/community-social-impact/_assets-custom/pdf/2020-ESG-Report.PDF",
    1, 'Charity', RBCcharity2Img),

    campaignObject(9, 'TD Bank Group’s 2020 ESG Report', 
    "See how our reports have evolved over the years. Read the report here.", 
    "https://www.td.com/document/PDF/ESG/2020-ESG-Report.pdf",
    2, 'Charity', TDcharityImg),

    campaignObject(10, 'TD Launches 3 new ETF’s for investors', 
    "TD launches three ETF's to help clients invest towards a better tomorrow.", 
    "http://td.mediaroom.com/2021-11-30-TD-Asset-Management-launches-three-new-Exchange-Traded-Funds-to-help-clients-invest-towards-a-better-tomorrow",
    2, 'Article', TDarticleImg),

    campaignObject(11, 'Getting Started at TD Ameritrade', 
    "This video walks you through the five essential things you should know.", 
    "https://www.youtube.com/watch?v=xQVH42vlPL8&ab_channel=TDAmeritrade",
    2, 'Other', TDotherImg),

    // use this for demo!
    // campaignObject(12, 'BMO’s 2020 Sustainability Report', 
    // "Read more about BMO Financial Group's 2020 Sustainability Report.", 
    // "https://our-impact.bmo.com/wp-content/uploads/2021/03/BMO-2020-ESG-PAS-accessible-1-1.pdf",
    // 3, 'Other', BMOcharityDemoImg),

    // use this for RBC demo!
    // campaignObject(12, 'Get Free Airpods with RBC', 
    // "Switch to RBC and get the latest Apple Airpods at not cost. Conditions Apply.", 
    // "https://www.rbcroyalbank.com/rbcoffers/",
    // 1, 'Product', RBCproduct2Img),



  
  ]); 
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
