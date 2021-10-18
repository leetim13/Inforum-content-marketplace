const db = require("../../models");
const User = db.users;
const Op = db.Sequelize.Op;

async function clearUserTable() {
    await User.destroy({ where: {}, truncate: false });
};

beforeAll(async () => {
    await clearUserTable();
    
});

afterAll(async () => {
    await clearUserTable();
    await db.sequelize.close()
});

test("No entry in user table", async () => {
    let num_entry = await User.count({ where: {} });
    expect(num_entry).toBe(0);
  })


test("Add 1 entry in user table", async () => {
    const user = {
        name: "John doe",
        type: "Admin",
        age: 29
    };
    let num_entry = await User.count({ where: {} });
    expect(num_entry).toBe(0);
    User.create(user).then(data => {
        expect(data).toEqual(expect.objectContaining(user));
    });
    num_entry = await User.count({ where: {} });
    expect(num_entry).toBe(0);
  })

