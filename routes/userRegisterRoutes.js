const userRegisterController = require('../controllers/userRegisterController');

module.exports = app => {
    app.route('/users/register')
    .get(userRegisterController.getRegister)
    .post(userRegisterController.register)
    
}