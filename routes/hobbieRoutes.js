const hobbieController = require('../controllers/hobbieController');

module.exports = app => {
    app.route('/hobbies')
    .get(hobbieController.getHobbies)
    .post(hobbieController.newHobbie)
}