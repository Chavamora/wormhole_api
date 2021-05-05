var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var port = process.env.PORT || '3000'
var fs = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken')
const passport = require('passport')

var imgModel = require('../models/image.js');

var multer = require('multer');
 
module.exports = {
    getImage,
    postImage
}

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({ storage: storage });



function getImage (req, res)  {

  passport.authenticate('jwt', 
  (err, user) => {
    if (err || !user) {
      return res.status(400).send("NO VALID TOKEN")   
    }

  console.log('hola')
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    }
    else {

      const dataBase64 = items[0].img.data.toString('base64')
      console.log(items)
      console.log(items[0].img.data) 
      
      obj= {
        items,
        dataBase64
      }
      res.status(200).send(obj)
     
    }
  });
  }

)(req, res)    
}

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!"+err);
  }

function postImage (req, res)  {
  passport.authenticate('jwt', 
  (err, user) => {
      if (err || !user) {
          return res.status(400).send("NO VALID TOKEN"+ err)   
      }

  console.log('cuerpo:', req.file)
  console.log(1)
  const tempPath = req.file.path;
  console.log('path= ', req.file.path)
  console.log(2)
  console.log(__dirname)

  const directory = ('C:/Users/chava gamer/Code/wormhole_api/uploads')

  const targetPath = path.join(directory, req.file.originalname);
  console.log(3)
  req.file.user_id = user._id

  console.log('buenas')
  console.log(4)

  if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
  console.log(5)

  fs.rename(tempPath, targetPath, err => {
    console.log(6)

    if (err) return handleError(err, res);
    console.log(7)
    console.log('cuerpo + userid:', req.file)
    console.log(4)

    var obj = {
      img: {
          data: fs.readFileSync(path.join(directory, req.file.originalname)),
          contentType: 'image/png'
      }
  }
  console.log(3)

  obj.user_id = user._id
console.log(1)
  imgModel.create(obj, (err, item) => {
    console.log(2)

      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          // res.status(200).send('image uploaded and saved');
          console.log('lol')
      }
  });

    res
      .status(200)
      .contentType("text/plain")
      .end("File uploaded!");
  });
    } else {
      console.log(8)
      fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);
  
      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png files are allowed!");
      });
    }
    console.log(user)
  }
  )(req, res)

}