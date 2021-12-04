/**
 * @class BaseWebScrapper
 * @abstract
 */
class BaseWebScrapper{
    constructor(platform) {
        if (this.constructor === BaseWebScrapper) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.platform = platform;
        this.timeout = 8000;
    }
    async getBrowser(headless=true) {
        throw new Error("getBrowser function Not implemented.");
    }

    async getPage(browser) {
        throw new Error("getPage function Not implemented.");
    }

    async loginWithCredentials(page, url) {
        throw new Error("loginWithCredentials function Not implemented.");
    }

    async loginWithCookies(page, url, cookies) {
        throw new Error("loginWithCookies function Not implemented.");
    }

    async getPost(url) {
        throw new Error("getPost function Not implemented.");
    }
}

module.exports = BaseWebScrapper;