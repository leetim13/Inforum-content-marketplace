const BaseWebScraper = require('../web-scraper/base.webscraper');
const FacebookWebScraper = require('../web-scraper/facebook.webscraper');
const logger = require("./logger");

exports.getPostData = async (url, platform) => {
    let webScraper;
    let postUrlRegex;
    switch(platform) {
        case "facebook":
            postUrlRegex = new RegExp(
                '^https:\/\/www.facebook.com\/.*$'
             );
            webScraper = new FacebookWebScraper();
            break;
        default:
            logger.error("Platform does not exist.");
            console.log("entered")
            postUrlRegex = new RegExp('a^'); // Match nothing
            // Should not end up here.
            webScraper = new BaseWebScraper("base");
    }
    if ( !postUrlRegex.test(url) ) {
        logger.error("Url does not match the format.");
        console.log("entered2")
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