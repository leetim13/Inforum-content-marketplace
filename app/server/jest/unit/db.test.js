const db = require("../../models");
const User = db.users;
const Op = db.Sequelize.Op;

async function clearUserTable() {
    await User.destroy({ where: {}, truncate: false });
};

beforeAll(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await db.sequelize.sync()
    await clearUserTable();
});

afterAll(async () => {
    await clearUserTable();
    await db.sequelize.close()
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

