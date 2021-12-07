const mocks = require('@jest-mock/express');

const InsightController = require("../../controllers/insight.controller");
const { getPostData } = require("../../helpers/webScraperHelper");
const db = require("../../models");
const Op = db.Sequelize.Op;
const Post = db["Post"];
const Insight = db["DailyInsight"];
const oldServerEnv = process.env.SERVER_ENV;

// mocking Logging
jest.mock("../../helpers/logger", () => {
    return {
        info: jest.fn(),
        error: jest.fn()
    }
})

// mocking web scraper helper
jest.mock('../../helpers/webScraperHelper', () => ({
    getPostData: jest.fn()
}));

describe('InsightController Test', function(){
    beforeAll(async () => {
        process.env.SERVER_ENV = "test";
        try {
            await db.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
    
    afterAll(async () => {
        await db.sequelize.close()
        process.env.SERVER_ENV = oldServerEnv;
    });

    describe('generateToday is working when', function() {
        beforeEach(async () => {
            jest.resetModules();

            await Post.create({
                "id": 1000000011,
                "UserId": 1000000001,
                "CampaignId": 1000000002,
                "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589011",
                "socialMedia": "facebook",
                "isVerified": true,
                "numClicks": 99
            })
        });

        afterEach(async () => {
            // Remove post after. (newly created insight will be cascade deleted)
            await Post.destroy({ where: { UserId: { [Op.eq]: 1000000001 }, CampaignId: { [Op.eq]: 1000000002 }}});
        })

        test("insights are generated successfully", async () => {
            const { res } = mocks.getMockRes();
            const insightController = new InsightController();
            const req = mocks.getMockReq();
            getPostData.mockReturnValueOnce({ message: "testGenerateToday", likes: 10 });

            await insightController.generateToday(req, res);

            const insight = await Insight.findOne({ where: { PostId: 1000000011 }});
            expect(insight).toEqual(expect.objectContaining({
                "PostId": 1000000011,
                "numClicks": 99,
                "numLikes": 10,
                "rewardPoints": 990
                // 10 reward points per click.
            }))

            expect(res.send).toHaveBeenCalledWith("Success");
        })

        test("fails because web scraper errors: Facebook cookies not found", async () => {
            const { res } = mocks.getMockRes();
            const insightController = new InsightController();

            const req = mocks.getMockReq();
            getPostData.mockImplementation(() => {
                throw new Error("Facebook cookies not found.");
            });
            await insightController.generateToday(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Facebook cookies not found."
            }));
        })

        test("fails because web scraper errors: Something went wrong with scraping.", async () => {
            const { res } = mocks.getMockRes();
            const insightController = new InsightController();

            const req = mocks.getMockReq();
            getPostData.mockImplementation(() => {
                throw new Error("Something went wrong with scraping.");
            });
            await insightController.generateToday(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Something went wrong with scraping."
            }));
        })

        test("fails because web scraper errors: Some other error", async () => {
            const { res } = mocks.getMockRes();
            const insightController = new InsightController();

            const req = mocks.getMockReq();
            getPostData.mockImplementation(() => {
                throw new Error("Some other error");
            });
            await insightController.generateToday(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Some other error"
            }));
        })

        test("fails because web scraper returned null", async () => {
            const { res } = mocks.getMockRes();
            const insightController = new InsightController();

            const req = mocks.getMockReq();
            getPostData.mockReturnValueOnce(null);
            await insightController.generateToday(req, res);

            const post = await Post.findByPk(1000000011);
            expect(post.isVerified).toEqual(false);
            expect(res.send).toHaveBeenCalledWith("Success");
        })
    })
})



