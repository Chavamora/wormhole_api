const reportesController = require('../controllers/reportesController');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/reportes')
    .get(reportesController.getReportes)
    app.route('/user/reporte')
    .get(reportesController.getSingleReporte)
    .post(reportesController.crearReporte)
    app.route('/user/reporte/editar')
    .post(reportesController.updateReporte)
    .delete(reportesController.deleteReporte)
    
}
