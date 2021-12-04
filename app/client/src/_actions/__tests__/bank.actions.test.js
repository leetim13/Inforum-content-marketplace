const updatePosts = require("../bank.actions");
test("Returns getAll and updatePosts ", () => {
    expect(updatePosts).toEqual({"bankActions": {"getAll": expect.any(Function), 
    "updatePosts": expect.any(Function)}})
});