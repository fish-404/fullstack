const listHelper = require("../utils/list_helper");
const blogs = require("./testcase").blogs;

describe("dummy test", () => {
  test("dummy returns one", () => {
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});
