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
    await clearUserTable();
    
});

afterAll(async () => {
    await clearUserTable();
    await db.sequelize.close()
});

test("No entry in user table", done => {
    User.count({ where: {} })
    .then(data => {
        expect(data).toBe(0)
        done();
    });
  })


test("Add 1 entry in user table", done => {
    const user = {
        name: "John doe",
        type: "Admin",
        age: 29
    };
    User.count({ where: {} })
    .then(data => expect(data).toBe(0))
    .then(_ => User.create(user))
    .then(data => expect(data).toEqual(expect.objectContaining(user)))
    .then(_ => User.count({ where: {} }))
    .then(data => {
            expect(data).toBe(1);
            done();
        });
  })

