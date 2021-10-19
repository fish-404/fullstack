const supertest = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const tests = require("./testcase");
const helper = require("../utils/list_helper");

const randomMax = 1000;
const initBlogs = tests.blogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

const api = supertest(app);

describe("Init Blogs", () => {
  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(initBlogs.length);
  });
});

describe("Analyze Blogs", () => {
  test("total Likes", async () => {
    const res = await api.get("/api/blogs");
    expect(helper.totalLikes(res.body)).toEqual(helper.totalLikes(initBlogs));
  });

  test("favoriteBlog", async () => {
    const res = await api.get("/api/blogs");
    expect(helper.favoriteBlog(res.body).title).toEqual(
      helper.favoriteBlog(initBlogs).title
    );
  });
  
  test("mostBlogs", async () => {
    const res = await api.get("/api/blogs");
    expect(helper.mostBlogs(res.body).blogs).toEqual(
      helper.mostBlogs(initBlogs).blogs
    );
  });
  
  test("mostLikes", async () => {
    const res = await api.get("/api/blogs");
    expect(helper.mostLikes(res.body).blogs).toEqual(
      helper.mostLikes(initBlogs).blogs
    );
  });
});

describe("Specific Blog", () => {
  test("rename id property name", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body[0].id).toBeDefined();
  });
});

describe("Add Blog", () => {
  test("post a new blog with valid parameters", async () => {
    const newBlog = {
      title: "Learn X in Y",
      author: "Conmunity",
      url: "https://learnxinyminutes.com/",
      likes: 0
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(initBlogs.length + 1);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(newBlog)])
    );
  });

  test("like default", async () => {
    const newBlog = {
      title: "Learn X in Y",
      author: "Community",
      url: "https://learnxinyminutes.com/"
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(initBlogs.length + 1);
    expect(res.body.find((x) => x.title === "Learn X in Y")).toHaveProperty(
      "likes",
      0
    );
  });

  test("bad request", async () => {
    const newBlog = {
      author: "Community"
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("Delete Blog", () => {
  test("delete blog", async () => {
    const res = await api.get("/api/blogs");
    const tobeDelId = helper.getRandomBlogId(res.body);
    await api.delete(`/api/blogs/${tobeDelId}`).expect(204);
    const again = await api.get("/api/blogs");
    expect(again.body).toHaveLength(initBlogs.length - 1);
  });
});

describe("Update Blog", () => {
  test("update blog likes", async () => {
    const res = await api.get("/api/blogs");
    const tobeUpdateId = helper.getRandomBlogId(res.body);
    const newLikes = helper.getRandomInt(randomMax);
    console.log(newLikes);
    const result = await api.put(
      `/api/blogs/${tobeUpdateId}/likes/${newLikes}`
    );
    expect(result.body.likes).toEqual(newLikes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
