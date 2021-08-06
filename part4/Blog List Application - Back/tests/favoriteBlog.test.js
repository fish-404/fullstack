const listhelper = require("../utils/list_helper");
const blogs = require("./testcase").blogs;

describe("favorite Blog", () => {
  test("most likes blog", () => {
    const result = listhelper.favoriteBlog(blogs);

    expect(result).toEqual(blogs[2]);
  });
});
