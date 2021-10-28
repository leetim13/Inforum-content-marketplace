const userBl = require("../../business-logic/user.bl");

let mockUser;

beforeEach(() => {
    mockUser = {
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
});

test("add reward point function.", async () => {
    expect(userBl.addRewardPoint(mockUser, 100)).toBe(110);
  })

test("deduct reward point function - success.", async () => {
    expect(userBl.deductRewardPoint(mockUser, 3)).toBe(7);
  })

test("deduct reward point function - error.", async () => {
    expect(() => userBl.deductRewardPoint(mockUser, 100)).toThrow(new Error("deductRewardPoint: can't deduct below zero."));
  })
