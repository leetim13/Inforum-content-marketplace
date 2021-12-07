const { getPostData } = require("../../helpers/webScraperHelper");
const FacebookWebScraper = require("../../web-scraper/facebook.webscraper");

// mocking Logging
jest.mock("../../helpers/logger", () => {
    return {
        info: jest.fn(),
        error: jest.fn()
    }
})

const mockGetPost = jest.fn();
jest.mock("../../web-scraper/facebook.webscraper", () => {
    return jest.fn().mockImplementation(() => {
        return { 'getPost': mockGetPost };
    });
});

describe('getPostData Test', function(){
    describe('it is working when', function() {
        const webScraper = new FacebookWebScraper();
        beforeEach(() => {
            jest.resetModules();
        })

        test("platform url format check passes", async () => {
            const spy = jest.spyOn(webScraper, 'getPost').mockReturnValueOnce({ message: "testWebScraperHelper", likes: 10 });
            const result = await getPostData('https://www.facebook.com/1234567', 'facebook');
            expect(result).toEqual({ message: "testWebScraperHelper", likes: 10 });
            spy.mockRestore();
        })

        test("success even if webScraper returned null.", async () => {
            const spy = jest.spyOn(webScraper, 'getPost').mockReturnValueOnce(null);
            const result = await getPostData('https://www.facebook.com/1234567', 'facebook');
            expect(result).toEqual(null);
            spy.mockRestore();
        })

        test("fails because platform url format does not passes", async () => {
            await expect(async () => {
                await getPostData('https://www.not.facebook.com/125235', 'facebook');
            }).rejects.toThrowError(new Error("Url does not match the format."));
        })

        test("fails because platform not supported", async () => {
            await expect(async () => {
                await getPostData('https://www.facebook.com/1234567', 'randomPlatform');
            }).rejects.toThrowError(new Error("Abstract classes can't be instantiated."));
        })

        test("fails because web scraper errors: Facebook cookies not found", async () => {
            
            const spy = jest.spyOn(webScraper, 'getPost').mockImplementation(() => {
                throw new Error("Facebook cookies not found.")
            });
            await expect(async () => {
                await getPostData('https://www.facebook.com/1234567', 'facebook');
            }).rejects.toThrowError(new Error("Facebook cookies not found."));
            spy.mockRestore();
        })

        test("fails because web scraper errors: Log in failed.", async () => {
            const spy = jest.spyOn(webScraper, 'getPost').mockImplementation(() => {
                throw new Error("Log in failed.")
            });
            await expect(async () => {
                await getPostData('https://www.facebook.com/1234567', 'facebook');
            }).rejects.toThrowError(new Error("Log in failed."));
            spy.mockRestore();
        })

        test("fails because web scraper errors: Some other error", async () => {
            const spy = jest.spyOn(webScraper, 'getPost').mockImplementation(() => {
                throw new Error("Some other error")
            });
            await expect(async () => {
                await getPostData('https://www.facebook.com/1234567', 'facebook');
            }).rejects.toThrowError(new Error("Some other error"));
            spy.mockRestore();
        })

        test("fails because web scraper errors: Post verification failed. Post not visible or link does not exist.", async () => {
            const spy = jest.spyOn(webScraper, 'getPost').mockImplementation(() => {
                throw new Error("Post verification failed. Post not visible or link does not exist.")
            });
            await expect(async () => {
                await getPostData('https://www.facebook.com/1234567', 'facebook');
            }).rejects.toThrowError(new Error("Post verification failed. Post not visible or link does not exist."));
            spy.mockRestore();
        })
    })
})



