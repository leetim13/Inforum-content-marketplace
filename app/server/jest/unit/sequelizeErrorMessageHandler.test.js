const { sequelizeErrorMessageHandler } = require("../../helpers/sequelizeErrorMessageHandler");

// mocking Logging
jest.mock("../../helpers/logger", () => {
    return {
        info: jest.fn(),
        error: jest.fn()
    }
})

describe('sequelizeErrorMessageHandler Test', function(){
    describe('it is working when', function() {
        test("response error is not an array", async () => {
            const result = sequelizeErrorMessageHandler({ message: "testing message 1"});
            expect(result).toEqual("testing message 1");
        })

        test("response error is an array", async () => {
            const result = sequelizeErrorMessageHandler({ errors: [{ message: "testing message 1"}, { message: "testing message 2"}, { message: "testing message 3"}, { message: "testing message 4"}]});
            expect(result).toEqual("1. testing message 1 2. testing message 2 3. testing message 3 4. testing message 4");
        })
    })
})



