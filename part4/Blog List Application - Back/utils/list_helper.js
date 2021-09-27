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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  getRandomBlogId,
  getRandomInt
};
