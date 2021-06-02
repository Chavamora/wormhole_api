const hobbieController = require('../controllers/hobbieController');

module.exports = app => {
    app.route('/user/hobbies')
    .get(hobbieController.getHobbies)
    .post(hobbieController.newHobbie)
    app.route('/user/hobbies/:id')
    .get(hobbieController.getSingleUserHobbies)
}