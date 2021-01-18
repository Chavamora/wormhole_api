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
// require("./config/passport")(passport)
//express app
const app = express();
var PORT = process.env.PORT || 3000
//connect to mongodb


const dbURL = 'mongodb+srv://beto:test1234@nodetuts.jy1sr.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

    const cors = require('cors');
    app.use(cors());
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

   //use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })

   
  
const apiRouter = express.Router()

apiRoutes(apiRouter);

app.use('/api/', apiRouter);

app.use(morgan('dev'));
