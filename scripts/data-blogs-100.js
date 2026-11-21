const { blogsPart1 } = require('./data-blogs-part1');
const { blogsPart2 } = require('./data-blogs-part2');

const blogs100 = blogsPart1.concat(blogsPart2);

module.exports = { blogs100 };
