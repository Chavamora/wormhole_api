const materiaController = require('../controllers/materiaController');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/materias' )
    .get(materiaController.getMaterias)
    .post(materiaController.newMateria)
    app.route('/user/materias/:id' )
    .get(materiaController.getSingleUserMaterias)
}