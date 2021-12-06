const mocks = require('@jest-mock/express');

const UserController = require("../../controllers/user.controller");
const { ValidationError } = require("sequelize");
const db = require("../../models");
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

describe('UserController Test', function(){
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

    describe('authenticate is working when', function(){
        test("admin authentication success", async () => {
            const {res, next} = mocks.getMockRes();
            const userController = new UserController();
            const req = mocks.getMockReq({ body: {username: "admin999", password: "admin999"}});
            await userController.authenticate(req, res, next);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: 1000000999,
                    username: 'admin999',
                    profilePicture: null,
                    firstName: 'admin999',
                    lastName: 'admin999',
                    role: 'Admin',
                    email: 'admin999@gmail.com'
                }),
            )
        })
        
        test("user1 authentication success", async () => {
            const {res, next} = mocks.getMockRes();
            const userController = new UserController();
            const req = mocks.getMockReq({ body: {username: "user1", password: "user1"}});
            await userController.authenticate(req, res, next);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    "connectionDemographic": {}, 
                    "email": "user1@gmail.com", 
                    "firstName": "user1", 
                    "id": 1000000001, 
                    "lastName": "user1", 
                    "role": "User", 
                }),
            )
        })
        
        test("rbc authentication success", async () => {
            const {res, next} = mocks.getMockRes();
            const userController = new UserController();
            const req = mocks.getMockReq({ body: {username: "rbc", password: "rbc"}});
            await userController.authenticate(req, res, next);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: 1000000001,
                    name: "RBC",
                    url: "https://www.rbcroyalbank.com/personal.html",
                    username: "rbc",
                }),
            )
        })
        
        test("wrong username, password authentication failure", async () => {
            const {res, next} = mocks.getMockRes();
            const userController = new UserController();
            const req = mocks.getMockReq({ body: {username: "-1", password: "-1"}});
            await userController.authenticate(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().json).toHaveBeenCalledWith({ message: 'Username or password is incorrect'});
        })
    })

    describe('create is working when', function() {
        test("user added successfully", async () => {
            const { res } = mocks.getMockRes();
            const userController = new UserController();
            const user = {
                "age": 20, 
                "connectionDemographic": {}, 
                "email": "testUserAddedSuccessfully@gmail.com", 
                "firstName": "testUserAddedSuccessfully", 
                "gender": "Male", 
                "lastName": "testUserAddedSuccessfully", 
                "password": "testUserAddedSuccessfully", 
                "rewardPoint": 0, 
                "role": "User", 
                "username": "testUserAddedSuccessfully"
            };

            const req = mocks.getMockReq({ body: user});
            
            await userController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.status().send)
            .toHaveBeenCalledWith(
                expect.objectContaining(user),
            );
        })
    })
})



