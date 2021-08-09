const supertest = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const tests = require("./testcase");

const initBlogs = tests.blogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

const api = supertest(app);

describe("Blog test", () => {
  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(initBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
