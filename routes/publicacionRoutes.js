const publicacionController = require('../controllers/publicacionController');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/publicaciones')
    .get(publicacionController.getAllPublicaciones)
    .post(publicacionController.postPublicacion)
    app.route('/user/publicacion')
    .get(publicacionController.getSinglePublicacion)
    
}
