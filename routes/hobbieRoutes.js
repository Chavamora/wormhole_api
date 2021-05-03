const hobbieController = require('../controllers/hobbieController');

module.exports = app => {
    app.route('/user/hobbies')
    .get(hobbieController.getHobbies)
    .post(hobbieController.newHobbie)
}