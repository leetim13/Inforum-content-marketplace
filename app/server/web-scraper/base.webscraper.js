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
    }

    getPost(req, res) {
        throw new Error("Web scaper getPost function Not implemented.");
    }
}

module.exports = BaseWebScrapper;