const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
var bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
var fs = require('fs');
var path = require('path');
var imgModel = require('./models/image');
var multer = require('multer');
const apiRoutes = require('./routes');
var multer = require('multer');

// require("./config/passport")(passport)
//express app
const app = express();
var PORT = process.env.PORT || 3000
//connect to mongodb


const dbURL = 'mongodb+srv://beto:1h6TcUceQzGynIJb@nodetuts.jy1sr.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

    const cors = require('cors');
 
    app.use(cors({
      origin: '*',
      methods: ["GET", "POST"],
      allowedHeaders: '*'
    }));


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(bodyParser.json())
/////////////////////
// SESSION CONFIG
/////////////////////

require("./config/passportConfig")(passport)



// const storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, '/uploads/');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));



app.use(passport.initialize());
app.use(passport.session());

  
const apiRouter = express.Router()
// const secureRoute = require('./routes/secure-routes');
apiRoutes(apiRouter);

app.use('/api/', apiRouter);
// app.use('/api/user', passport.authenticate('jwt', { session: false }), secureRoute);


app.use(morgan('dev'));
