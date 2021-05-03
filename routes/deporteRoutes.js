const deporteController = require('../controllers/deporteController');

module.exports = app => {
    app.route('/user/deportes')
    .get(deporteController.getDeportes)
    .post(deporteController.newDeporte)
}