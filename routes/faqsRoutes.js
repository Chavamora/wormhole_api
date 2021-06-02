const faqsController = require('../controllers/faqsController');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/faqs' )
    .get(faqsController.getFaqs)
    .post(faqsController.crearFaq)
    app.route('/user/faqs/modificar/:id')
    .post(faqsController.editarFaq)
    .delete(faqsController.eliminarFaq)
}