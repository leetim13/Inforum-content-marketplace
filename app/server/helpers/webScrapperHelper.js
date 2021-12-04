const BaseWebScrapper = require('../web-scraper/base.webscraper');
const FacebookWebScrapper = require('../web-scraper/facebook.webscraper');
const logger = require("../helpers/logger");

exports.getPostData = async (url, platform, testUrl) => {
    let webScraper;
    let postUrlRegex;
    switch(platform) {
        case "facebook":
            postUrlRegex = new RegExp(
                '^https:\/\/www.facebook.com\/.*$'
             );
            webScraper = new FacebookWebScrapper();
            break;
        default:
            logger.error("Platform does not exist.");
            postUrlRegex = new RegExp('a^'); // Match nothing
            // Should not end up here.
            webScraper = new BaseWebScrapper("base");
    }
    if ( !postUrlRegex.test(url) ) {
        logger.error("Url does not match the format.");
        throw new Error("Url does not match the format.");
    }
    let postData;
    try {
        postData = await webScraper.getPost(url);
    } catch (e) {
        console.log("Helper");
        console.log(e)
        logger.error(e.message);
        throw e;
    }
    return postData;
}