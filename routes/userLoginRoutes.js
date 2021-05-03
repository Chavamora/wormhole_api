const userLoginController = require('../controllers/userLoginController');

module.exports = app => {
    app.route('/user/login')
    .get(userLoginController.getLogin)
    .post(userLoginController.login)
    
}