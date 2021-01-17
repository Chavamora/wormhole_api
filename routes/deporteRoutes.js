const deporteController = require('../controllers/deporteController');

module.exports = app => {
    app.route('/deportes')
    .get(deporteController.getDeportes)
    .post(deporteController.newDeporte)
}