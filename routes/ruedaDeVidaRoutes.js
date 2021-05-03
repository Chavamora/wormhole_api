const ruedaDeVidaController = require('../controllers/ruedaDeVidaController');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/ruedaDeVida' )
    .get(ruedaDeVidaController.getRuedaDeVida)
    .post(ruedaDeVidaController.newRuedaDeVida)
}