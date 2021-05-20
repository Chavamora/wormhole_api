const faqsController = require('../controllers/faqsController');
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = app => {
    app.route('/user/faqs' )
    .get(faqsController.getFaqs)
    .post(faqsController.postFaqs)
    app.route('/user/faqs/modificar/:id')
    .get(faqsController.getFaqsEdit)
    .post(faqsController.postFaqsEdit)
}