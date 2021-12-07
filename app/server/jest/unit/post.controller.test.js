const mocks = require('@jest-mock/express');

const PostController = require("../../controllers/post.controller");
const { getPostData } = require("../../helpers/webScraperHelper");
const db = require("../../models");
const Post = db['Post'];
const Campaign = db['Campaign'];
const Op = db.Sequelize.Op;
const oldServerEnv = process.env.SERVER_ENV;

// mocking Logging
jest.mock("../../helpers/logger", () => {
    return {
        info: jest.fn(),
        error: jest.fn()
    }
})

jest.mock('../../helpers/webScraperHelper', () => ({
    getPostData: jest.fn()
}));

describe('PostController Test', function(){
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

    describe('create is working when', function() {
        beforeEach(() => jest.resetModules());

        test("post added successfully", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": 1000000001,
                "CampaignId": 1000000002,
                "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589013",
                "platform": "facebook"
            };
            getPostData.mockReturnValueOnce({ message: "testPostController", likes: 10 });

            const req = mocks.getMockReq({ body: post });
            
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    "UserId": 1000000001,
                    "CampaignId": 1000000002,
                    "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589013",
                    "isVerified": true,
                    "socialMedia": "facebook"
                }),
            );
            
            // Remove post after.
            Post.destroy({ where: { UserId: { [Op.eq]: 1000000001 }, CampaignId: { [Op.eq]: 1000000002 }}});
        })

        test("fails because user cannot be found", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": -1,
                "CampaignId": 1000000002
            };

            const req = mocks.getMockReq({ body: post });
            
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().send)
            .toHaveBeenCalledWith({
                message: "User does not exist"
            });
        })

        test("fails because campaign cannot be found", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": 1000000001,
                "CampaignId": -1
            };

            const req = mocks.getMockReq({ body: post });
            
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().send)
            .toHaveBeenCalledWith({
                message: "Campaign does not exist"
            });
        })

        test("fails because user already have a post on this campaign", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": 1000000001,
                "CampaignId": 1000000001
            };

            const req = mocks.getMockReq({ body: post });
            
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().send)
            .toHaveBeenCalledWith({
                message: "User already posted for this campaign"
            });
        })

        test("fails because web scraper errors: Facebook cookies not found", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": 1000000001,
                "CampaignId": 1000000002,
                "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589011",
                "isVerified": true,
                "platform": "facebook"
            };

            const req = mocks.getMockReq({ body: post });
            getPostData.mockImplementation(() => {
                throw new Error("Facebook cookies not found.");
            });
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Facebook cookies not found."
            }));
        })

        test("fails because web scraper errors: Something went wrong with scraping.", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": 1000000001,
                "CampaignId": 1000000002,
                "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589011",
                "isVerified": true,
                "platform": "facebook"
            };

            const req = mocks.getMockReq({ body: post });
            getPostData.mockImplementation(() => {
                throw new Error("Something went wrong with scraping.");
            });
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Something went wrong with scraping."
            }));
        })

        test("fails because web scraper errors: Some other error", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": 1000000001,
                "CampaignId": 1000000002,
                "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589011",
                "isVerified": true,
                "platform": "facebook"
            };

            const req = mocks.getMockReq({ body: post });
            getPostData.mockImplementation(() => {
                throw new Error("Some other error");
            });
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Some other error"
            }));
        })

        test("fails because web scraper returned null", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();
            const post = {
                "UserId": 1000000001,
                "CampaignId": 1000000002,
                "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589011",
                "isVerified": true,
                "platform": "facebook"
            };

            const req = mocks.getMockReq({ body: post });
            getPostData.mockReturnValueOnce(null);
            await postController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().send)
            .toHaveBeenCalledWith({ message: "Post not visible." });
        })
    })

    describe('numClicksPlusOne is working when', function() {
        test("successfully increments numClicks by 1 on post.", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();

            const req = mocks.getMockReq({ body: {
                userId: 1000000001,
                campaignId: 1000000001
            } });
            await postController.numClicksPlusOne(req, res);

            const post = await Post.findOne({ where: { UserId: { [Op.eq]: req.body.userId }, CampaignId: { [Op.eq]: req.body.campaignId }}, include: { model: Campaign } });
            expect(post.numClicks).toEqual(1);
            post.numClicks = 0;
            await post.save();
            expect(res.send).toHaveBeenCalledWith("https://www.rbc.com/our-company/0626-2020-rbc-named-north-american-retail-bank-of-the-year.html");
        })

        test("fails because campaign not found.", async () => {
            const { res } = mocks.getMockRes();
            const postController = new PostController();

            const req = mocks.getMockReq({ body: {
                userId: 1000000001,
                campaignId: -1
            } });
            await postController.numClicksPlusOne(req, res);

            const post = await Post.findOne({ where: { UserId: { [Op.eq]: req.body.userId }, CampaignId: { [Op.eq]: req.body.campaignId }}, include: { model: Campaign } });
            expect(post).toEqual(null);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().send)
            .toHaveBeenCalledWith({
                message: "Campaign not found."
            });
        })
    })
})



