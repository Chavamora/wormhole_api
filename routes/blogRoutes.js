const blogController = require('../controllers/blogController');

module.exports = app => {
    app.route('/user/blogs')
    .get(blogController.getBlogs)
    .post(blogController.newBlog)
}