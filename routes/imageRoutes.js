const imageController = require('../controllers/imageController.js');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/image' )
    .get(imageController.getImage)
    .post(imageController.postImage)
}