const blogController = require('../controllers/blogController');

module.exports = app => {
    app.route('/blogs')
    .get(blogController.getBlogs)
    .post(blogController.newBlog)
}