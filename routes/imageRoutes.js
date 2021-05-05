const imageController = require('../controllers/imageController.js');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const multer = require('multer')


  
  

module.exports = app => {
    const upload = multer({
        dest: "/uploads"
        // you might also want to set some limits: https://github.com/expressjs/multer#limits
    });
    app.route('/user/image' )
    .get(imageController.getImage)
    .post(
        upload.single("image"), /* name attribute of <file> element in your form */
        imageController.postImage
    )  
}
    


