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

const groupByAuthor = (blogs) => {
  return lodash.groupBy(blogs, "author");
};

const likesByAuthor = (blogs) => {
  const likeByAuthor = [];
  lodash.forEach(groupByAuthor(blogs), function (value, key) {
    likeByAuthor.push({
      author: key,
      likes: lodash.sumBy(value, "likes")
    });
  });
  return likeByAuthor;
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

const mostLikes = (blogs) => {
  return lodash.maxBy(likesByAuthor(blogs), "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  getRandomBlogId,
  getRandomInt,
  mostBlogs, 
  mostLikes
};
