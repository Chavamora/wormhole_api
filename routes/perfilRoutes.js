const perfilController = require('../controllers/perfilController.js');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/perfil' )
    .get(perfilController.getPerfil)
    .post(perfilController.postPerfil)
}