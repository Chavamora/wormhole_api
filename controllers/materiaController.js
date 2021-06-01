const Materia = require('../models/materia.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = {
    getMaterias,
    newMateria
}

function getMaterias (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        console.log('hola')
        Materia.find({"user_id": user._id}).sort({ createdAt: -1})
        .then((result) => {
          res.json(result);
        //   return false
        console.log('hola2')

        })
        .catch((err) => {
            console.log(err);
        //    return res.status(500).send('unexpected error')
        // return fals
        })
        console.log(user)
        
    }
)(req, res)
    
}



function newMateria  (req, res)  {
    console.log(req.body);
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        console.log(req.body);
        const materia = new Materia(req.body);
        materia.user_id = user._id;
        console.log(materia);
        materia.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
        })
        console.log(user)
    }
    )(req, res)
}
    