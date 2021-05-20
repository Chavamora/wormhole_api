const reportesController = require('../controllers/reportesController');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/reportes')
    .get(reportesController.getReportes)
    .post(reportesController.postReporte)
    app.route('/user/reporte')
    .get(reportesController.getSingleReporte)
    .post(reportesController.postSingleReporte)
}
