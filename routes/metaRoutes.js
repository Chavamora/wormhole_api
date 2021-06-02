const metaController = require('../controllers/metaController');

module.exports = app => {
    app.route('/user/metas')
    .get(metaController.getMetas)
    .post(metaController.newMeta)
    app.route('/user/metas/:id')
    .get(metaController.getSingleUserMetas)
}