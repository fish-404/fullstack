const listhelper = require("../utils/list_helper");
const blogs = require("./testcase").blogs;

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listhelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  });
});
