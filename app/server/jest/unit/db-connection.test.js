const { ValidationError } = require("sequelize");
const db = require("../../models");
const User = db['User'];
const Op = db.Sequelize.Op;
const oldServerEnv = process.env.SERVER_ENV;

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

test("Add user with null first name", async () => {
    const user = {
        username: "Johnusername",
        password: "Johnpassword",
        firstName: null,
        lastName: "Doe",
        age: 20,
        gender: 'Male',
        country: 'Canada',
        rewardPoint: 10,
        role: "Admin",
        email: 'john@gmail.com'
    };
    let data = null;
    const count = await User.count({ where: {} });
    await expect(User.create(user))
    .rejects
    .toThrow(ValidationError);
    data = await User.count({ where: {} });
    expect(data).toBe(count);
  })

test("Add user with empty string firstName", async () => {
    const  user = {
        username: "Johnusername",
        password: "Johnpassword",
        firstName: "",
        lastName: "Doe",
        age: 20,
        gender: 'Male',
        country: 'Canada',
        rewardPoint: 10,
        role: "Admin",
        email: 'john@gmail.com'
    };
    let data = null;
    const count = await User.count({ where: {} });
    await expect(User.create(user))
    .rejects
    .toThrow(ValidationError);
    data = await User.count({ where: {} });
    expect(data).toBe(count);
  })

