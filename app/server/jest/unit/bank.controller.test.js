const mocks = require('@jest-mock/express');

const BankController = require("../../controllers/bank.controller");
const db = require("../../models");
const oldServerEnv = process.env.SERVER_ENV;

// mocking Logging
jest.mock("../../helpers/logger", () => {
    return {
        info: jest.fn(),
        error: jest.fn()
    }
})

describe('BankController Test', function(){
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

    describe('findAllCampaigns is working when', function() {
        test("finds only this bank's post", async () => {
            const { res } = mocks.getMockRes();
            const bankController = new BankController();
            const req = mocks.getMockReq({ 
                params: { id: 1000000001 } });
            
            await bankController.findAllCampaigns(req, res);
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
    })

    describe('getImage is working when', function() {
        test("sends an image successfully", async () => {
            const { res } = mocks.getMockRes();
            const bankController = new BankController();
            const req = mocks.getMockReq({ 
                params: { id: 1000000001 }});
            
            await bankController.getImage(req, res);
            expect(res.send)
            .toHaveBeenCalledWith(null);
            // Seed profiles has no image
        })

        test("fails because bank not found", async () => {
            const { res } = mocks.getMockRes();
            const bankController = new BankController();
            const req = mocks.getMockReq({ 
                params: { id: -1 }, 
                user: { role: "Admin" } });
            
            await bankController.getImage(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().send)
            .toHaveBeenCalledWith({
                message: "Bank not found"
            });
        })
    })
})



