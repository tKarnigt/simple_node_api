const { plusHandler, server } = require("./index"); // Import your Express route handler function

describe("Plus endpoint handler", () => {
  test("returns the sum of two numbers passed in parameters", () => {
    const req = {
      params: {
        num1: "27",
        num2: "13",
      },
    };
    const res = {
      json: jest.fn(),
    };

    plusHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(40);
  });

  test("returns NaN if parameters are not valid numbers", () => {
    const req = {
      params: {
        num1: "abc",
        num2: "xyz",
      },
    };
    const res = {
      json: jest.fn(),
    };

    plusHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(NaN);
  });
});
afterAll((done) => {
  server.close(done);
});