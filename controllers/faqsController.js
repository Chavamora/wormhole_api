const Faq = require('../models/pregunta.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')

var editor

module.exports = {
    getFaqs,
    crearFaq,
    editarFaq, 
    eliminarFaq,
}

function getFaqs (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

            //el usuario es editor
            Faq.find().sort({ createdAt: -1})
            .then((result) => {
               
                result.push(user.tipo)
                res.json(result)
            })
            .catch((err) => {
                console.log(err);
            })
 
    }
)(req, res)
    
}

function crearFaq  (req, res)  {
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

function editarFaq  (req, res)  {
    console.log(req.body.titulo);

    passport.authenticate('jwt', 
    async (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        const id = req.params.id;

        try {
            const faq = await Faq.findByIdAndUpdate(id, {titulo: req.body.titulo, respuesta: req.body.respuesta},  {lean: true, new: true}).exec();
            console.log(faq)
            res.status(200).json(faq)

            } catch(err) {
                console.log(err)

                res.status(400).json({message: 'algo salió mal'})
            }
    }
    )(req, res)
}

function eliminarFaq  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        
        const id = req.params.id;
 
        console.log(req.body);
        Faq.findByIdAndDelete(id)
        .then(result => {
            res.status(200).json({message: 'eliminado correctamente'})
        })
        .catch(err => {
            console.log(err)
        })
    }
    )(req, res)
}
