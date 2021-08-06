const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, cur) => ({ likes: sum.likes + cur.likes })).likes;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, cur) => (max.likes > cur.likes ? max : cur));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
