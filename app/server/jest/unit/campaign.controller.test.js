const mocks = require('@jest-mock/express');

const CampaignController = require("../../controllers/campaign.controller");
const { ValidationError } = require("sequelize");
const db = require("../../models");
const Campaign = db['Campaign'];
const Post = db['Post'];
const User = db['User'];
const Op = db.Sequelize.Op;
const oldServerEnv = process.env.SERVER_ENV;

// mocking Logging
jest.mock("../../helpers/logger", () => {
    return {
        info: jest.fn(),
        error: jest.fn()
    }
})

describe('CampaignController Test', function(){
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
        test("campaign added successfully", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const campaign = {
                "BankId": 1 + 1000000000,
                "type": "Product",
                "title": "testingCampaignCreateSuccessfully",
                "url": "http://testingCampaignCreateSuccessfully.com",
                "description": "testingCampaignCreateSuccessfully",
                "image": null,
                "startDate": new Date(),
                "endDate": new Date()
            };

            const req = mocks.getMockReq({ body: campaign });
            
            await campaignController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining(campaign),
            );
            
            // Remove campaign after.
            Campaign.destroy({ where: { title: { [Op.eq]: "testingCampaignCreateSuccessfully" }}});
        })

        test("fails because bank cannot be found", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const campaign = {
                "BankId": -1
            };

            const req = mocks.getMockReq({ body: campaign });
            
            await campaignController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().send)
            .toHaveBeenCalledWith({
                message: "Bank does not exist."
            });
        })
    })

    describe('findAll is working when', function() {
        test("finds the correct campaigns under bankId", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const req = mocks.getMockReq({ 
                query: { BankId: 1000000001}});
            
            await campaignController.findAll(req, res);
            expect(res.send)
            .toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        BankId: 1000000001
                    }),
                    ...[2, 3, 4, 5]
                    .map(i => expect.not.objectContaining({
                        BankId: 1000000000 + i
                    }))
                ])
            );
        })

        test("finds the correct campaigns under type", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const req = mocks.getMockReq({ 
                query: { type: "Product" }});
            
            await campaignController.findAll(req, res);
            expect(res.send)
            .toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: "Product"
                    }),
                    ...["Article", "Charity", "Other"]
                    .map(i => expect.not.objectContaining({
                        type: i
                    }))
                ])
            );
        })
    })

    describe('closeCampaign is working when', function() {
        test("successfully distributed reward points.", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            
            await Campaign.create({
                "id": 1000000012,
                "BankId": 1 + 1000000000,
                "type": "Product",
                "title": "testingcloseCampaign",
                "url": "http://testingcloseCampaign.com",
                "description": "testingcloseCampaign",
                "image": null,
                "startDate": new Date(),
                "endDate": new Date()
            })
            await Post.create({
                "UserId": 1000000001,
                "CampaignId": 1000000012,
                "url": "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589012",
                "socialMedia": "facebook",
                "numClicks": 10,
                "isVerified": true
            })

            let user = await User.findByPk(1000000001);
            expect(user.rewardPoint).toEqual(10);
            const req = mocks.getMockReq({ params: { id: 1000000012}});
            
            await campaignController.closeCampaign(req, res);
            expect(res.send).toHaveBeenCalledWith({ message: "Success" });
            
            user = await User.findByPk(1000000001);
            expect(user.rewardPoint).toEqual(110);

            user.rewardPoint = 10;
            await user.save();

            await Post.destroy({ where: { url: { [Op.eq]: "https://www.facebook.com/permalink.php?story_fbid=118546253979789&id=10007473243589012"}}});
            await Campaign.destroy({ where: { id: { [Op.eq]: 1000000012}}});
        })

        test("failed because campaign not found.", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();

            const req = mocks.getMockReq({ params: { id: -1 }});
            
            await campaignController.closeCampaign(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().send).toHaveBeenCalledWith({
                message: "Campaign not found."
            });
        })

        test("failed because campaign has not pass end date yet.", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);
            await Campaign.create({
                "id": 1000000012,
                "BankId": 1 + 1000000000,
                "type": "Product",
                "title": "testingcloseCampaign",
                "url": "http://testingcloseCampaign.com",
                "description": "testingcloseCampaign",
                "image": null,
                "startDate": new Date(),
                "endDate": endDate
            })

            let user = await User.findByPk(1000000001);
            expect(user.rewardPoint).toEqual(10);
            const req = mocks.getMockReq({ params: { id: 1000000012}});
            
            await campaignController.closeCampaign(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().send).toHaveBeenCalledWith({
                message: "Campaign hasn't pass its end date yet."
            });
            
            user = await User.findByPk(1000000001);
            expect(user.rewardPoint).toEqual(10);

            await Campaign.destroy({ where: { id: { [Op.eq]: 1000000012}}});
        })
    })

    describe('findAllPosts is working when', function() {
        test("finds only this campaign's post", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const req = mocks.getMockReq({ 
                params: { id: 1000000001 },
                user: { role: "Bank" }
            });
            
            await campaignController.findAllPosts(req, res);
            expect(res.send)
            .toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        CampaignId: 1000000001
                    }),
                    ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                    .map(i => expect.not.objectContaining({
                        CampaignId: 1000000000 + i
                    }))
                ])
            );
        })

        test("finds all the posts under all campaigns for admin", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const req = mocks.getMockReq({ 
                params: { id: -1 }, 
                user: { role: "Admin" } });
            
            await campaignController.findAllPosts(req, res);
            expect(res.send)
            .toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        CampaignId: 1000000001
                    })
                ])
            );
        })

        test("fails to get posts under all campaigns because user role is not admin", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const req = mocks.getMockReq({ 
                params: { id: -1 }, 
                user: { role: "Bank" } });
            
            await campaignController.findAllPosts(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.status().json)
            .toHaveBeenCalledWith(
                expect.objectContaining({ message: 'Unauthorized' })
            );
        })
    })

    describe('getImage is working when', function() {
        test("sends an image successfully", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const req = mocks.getMockReq({ params: { id: 1000000001 } });
            
            await campaignController.getImage(req, res);
            expect(res.send).toHaveBeenCalledWith(expect.anything());
            // Simply check if something exist, because image is a binary string.
        })

        test("fails because campaign not found", async () => {
            const { res } = mocks.getMockRes();
            const campaignController = new CampaignController();
            const req = mocks.getMockReq({ params: { id: -1 } });
            
            await campaignController.getImage(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().send)
            .toHaveBeenCalledWith({
                message: "Campaign not found"
            });
        })
    })
})



