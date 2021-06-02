var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var port = process.env.PORT || '3000'
var fs = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { cloudinary } = require('../utils/cloudinary')
const User = require('../models/user.js')

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



function getImage(req, res) {

  passport.authenticate('jwt',
    async (err, user) => {
      if (err || !user) {
        return res.status(400).send("NO VALID TOKEN" + err)
      }

      // console.log('hola')
      // imgModel.find({}, (err, items) => {
      //   if (err) {
      //     console.log(err);
      //     res.status(500).send('An error occurred', err);
      //   }
      //   else {

      //     const dataBase64 = items[0].img.data.toString('base64')
      //     console.log(items)
      //     console.log(items[0].img.data) 

      //     obj= {
      //       items,
      //       dataBase64
      //     }
      //     res.status(200).send(obj)

      //   }
      // });l


      const { resources } = await cloudinary.search.expression('folder:user_profile_pictures')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
      const publicIds = resources.map(file => file.public_id)
      res.json(publicIds)
    }
  )(req, res)
}

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!" + err);
}

function postImage(req, res) {
  passport.authenticate('jwt',
    async (err, user) => {
      if (err || !user) {
        return res.status(400).send("NO VALID TOKEN" + err)
      }


      try {
        const fileStr = req.body.data;
        console.log(fileStr)
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'profile_pictures'
        })
        const url = uploadedResponse.secure_url

        User.findByIdAndUpdate(
          { _id: user._id },
          { profile_picture_url: url })
          .then((user) => {
          })



        res.json({ msg: 'YAYAYYAYAYYA' })



      } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'something went wrong' })
      }




    }
  )(req, res)

}