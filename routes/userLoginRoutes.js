const userLoginController = require('../controllers/userLoginController');

module.exports = app => {
    app.route('/users/login')
    .get(userLoginController.getLogin)
    .post(userLoginController.login)
    
}