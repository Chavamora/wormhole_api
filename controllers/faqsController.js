const Faq = require('../models/faq.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')

var editor

module.exports = {
    getMaterias,
    newMateria
}

function getfaqs (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        if (user.tipo === 2) {
            //el usuario es editor
            Faq.find().sort({ createdAt: -1})
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            //el usuario NO es editor
            Faq.find().sort({ createdAt: -1})
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err);
            })
        } 
    }
)(req, res)
    
}

function postFaqs  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        const faq = new Faq(req.body);

        faq['user_id'] = user._id;
        console.log(pregunta);
        console.log(req.body);
    
        pregunta.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    )(req, res)
}

//MODIFICAR PREGUNTAS

function getFaqsEdit  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        const id = req.params.id;

        Faq.findById(id)
        .then(result => {
         res.json(result);
         console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
    )(req, res)
}

function postFaqsEdit  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        const id = req.params.id;
 
        console.log(req.body);
        Faq.findByIdAndUpdate(

        {_id: id}, 
        {titulo: req.body.titulo,
        respuesta: req.body.respuesta},
        
        
        function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.status(200).send('Pregunta Actualizada');
            }
        }
    )
    .catch(err => {
        console.log(err)
    })
    }
    )(req, res)
}
