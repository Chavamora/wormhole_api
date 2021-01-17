const userController = require('../controllers/userController');

module.exports = app => {
    app.route('/users/login')
    .get(userController.getLogin)
    .post(userController.login)
    app.route('/users/register')
    .get(userController.getRegister)
    .post(userController.register)
}