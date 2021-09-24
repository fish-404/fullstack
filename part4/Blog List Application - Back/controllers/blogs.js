const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404);
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id);
    if (result) {
      response.status(204).json(result);
    }
  } catch (error) {
    next(error);
  }
});

// update likes
blogRouter.put("/:id/likes/:likes", async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        likes: request.params.likes
      },
      {
        new: true // return updated document
      }
    );
    if (result) {
      response.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter
