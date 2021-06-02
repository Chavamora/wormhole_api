const followsController = require('../controllers/followsController.js');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/follow/:user_followed_id' )
    .post(followsController.follow)
    app.route('/user/unfollow/:user_followed_id')
    .delete(followsController.unfollow)
    app.route('/user/checkFollow/:user_followed_id')
    .get(followsController.getFollows)
    app.route('/user/getFollows')
    .get(followsController.getFollowersData)
    app.route('/user/getFollows/:id')
    .get(followsController.getFollowersDataId)
}