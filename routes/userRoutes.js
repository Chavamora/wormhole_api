const userController = require('../controllers/userController');

module.exports = app => {
    app.route('/users')
    .get(userController.getUsers)
    .post(userController.newUser)
}