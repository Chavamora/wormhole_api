const User = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = {
    getPerfil,
    postPerfil
}

function getPerfil  (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }


        User.find({"_id": user._id})
        .then((result) => {
          res.json(result);
          console.log(result);
        //   return false
        })
        .catch((err) => {
            console.log(err);
        //    return res.status(500).send('unexpected error')
        // return false
        })


        console.log(user)


    }
)(req, res)


}

function postPerfil  (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }


        User.find({"_id": user._id})
        .then((result) => {
          res.json(result);
          console.log(result);
        //   return false
        })
        .catch((err) => {
            console.log(err);
        //    return res.status(500).send('unexpected error')
        // return false
        })


        console.log(user)


    }
)(req, res)


}