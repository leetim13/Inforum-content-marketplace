const userBl = require("../../business-logic/user.bl");

let mockUser;

beforeEach(() => {
    mockUser = { name: "TimBot", type: "Admin", age: 23, rewardPoint: 10 };
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
