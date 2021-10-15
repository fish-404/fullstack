const _ = require("lodash");

const getRandomInt = (max) => {
  return _.random(max);
};

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return _.sumBy(blogs, "likes");
};

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, "likes");
};

const getRandomBlogId = (blogs) => {
  return blogs[getRandomInt(blogs.length)].id;
};

const countByAuthor = (blogs) => {
  return lodash.countBy(blogs, "author");
};

const mostBlogs = (blogs) => {
  const blogCountObj = countByAuthor(blogs);
  const maxBlogCount = lodash.max(lodash.values(blogCountObj));
  return {
    name: lodash.findKey(blogCountObj, function (value) {
      return value === maxBlogCount;
    }),
    blogs: maxBlogCount
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  getRandomBlogId,
  getRandomInt,
  mostBlogs
};
