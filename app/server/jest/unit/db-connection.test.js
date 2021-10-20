const { ValidationError } = require("sequelize");
const db = require("../../models");
const User = db['User'];
const Op = db.Sequelize.Op;
const oldServerEnv = process.env.SERVER_ENV;

async function clearUserTable() {
    await User.destroy({ where: {}, truncate: false });
};

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

afterEach(async () => {
    await clearUserTable();
});

test("No entry in user table", async () => {
    let data = await User.count({ where: {} });
    expect(data).toBe(0);
  })

test("Add 1 entry in user table", async () => {
    const user = {
        name: "John doe",
        type: "Admin",
        age: 29
    };
    let data = null;
    data = await User.count({ where: {} });
    expect(data).toBe(0);
    data = await User.create(user);
    expect(data).toEqual(expect.objectContaining(user));
    data = await User.count({ where: {} });
    expect(data).toBe(1);
  })

test("Add user with null name", async () => {
    const user = {
        name: null,
        type: "Admin",
        age: 29
    };
    let data = null;
    data = await User.count({ where: {} });
    expect(data).toBe(0);
    await expect(User.create(user))
    .rejects
    .toThrow(new ValidationError("notNull Violation: User.name cannot be null"));
    data = await User.count({ where: {} });
    expect(data).toBe(0);
  })

test("Add user with empty string name", async () => {
    const user = {
        name: "",
        type: "Admin",
        age: 29
    };
    let data = null;
    data = await User.count({ where: {} });
    expect(data).toBe(0);
    await expect(User.create(user))
    .rejects
    .toThrow(new ValidationError("Validation error: Validation notEmpty on name failed"));
    data = await User.count({ where: {} });
    expect(data).toBe(0);
  })

