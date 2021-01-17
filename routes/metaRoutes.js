const metaController = require('../controllers/metaController');

module.exports = app => {
    app.route('/metas')
    .get(metaController.getMetas)
    .post(metaController.newMeta)
}