const BaseWebScrapper = require('../web-scraper/base.webscraper');
const FacebookWebScrapper = require('../web-scraper/facebook.webscraper');

exports.getPostData = async (url, platform, testUrl) => {
    let webScraper;
    let postUrlRegex;
    switch(platform) {
        case "facebook":
            postUrlRegex = new RegExp(
                '^https:\/\/www.facebook.com\/.*\/posts\/[0-9]+$'
             );
            webScraper = new FacebookWebScrapper();
            break;
        default:
            postUrlRegex = new RegExp('a^'); // Match nothing
            // Should not end up here.
            webScraper = new BaseWebScrapper("base");
    }
    if ( !postUrlRegex.test(url) ) {
        throw new Error("Url does not match the format.");
    }
    let postData;
    try {
        postData = await webScraper.getPost(url);
    } catch (e) {
        console.log("Helper");
        console.log(e)
        throw e;
    }
    return postData;
}