const followsController = require('../controllers/followsController.js');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/follow/:user_followed_id' )
    .post(followsController.follow)
    app.route('/user/unfollow/:user_followed_id')
    .delete(followsController.unfollow)
}