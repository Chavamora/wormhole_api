const userRegisterController = require('../controllers/userRegisterController');

module.exports = app => {
    app.route('/user/register')
    .get(userRegisterController.getRegister)
    .post(userRegisterController.register)
}