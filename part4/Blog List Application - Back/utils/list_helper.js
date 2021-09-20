function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, cur) => ({ likes: sum.likes + cur.likes })).likes;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, cur) => (max.likes > cur.likes ? max : cur));
};

const getRandomBlogId = (blogs) => {
  return blogs[getRandomInt(blogs.length)].id;
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
