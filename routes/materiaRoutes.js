const materiaController = require('../controllers/materiaController');

module.exports = app => {
    app.route('/materias')
    .get(materiaController.getMaterias)
    .post(materiaController.newMateria)
}