const commentsController = require('../controllers/commentsController.js');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/comments')
    .get(commentsController.getComments)
    .post(commentsController.postComment)
}
