const Materia = require('../models/materia.js')
const mongoose = require('mongoose')

module.exports = {
    getMaterias,
    newMateria
}

function getMaterias  (req, res)  {
    Materia.find().sort({ createdAt: -1})
    .then((result) => {
       res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('unexpected error')
    })

}

function newMateria  (req, res)  {
    console.log(req.body);
    const materia = new Materia(req.body);
    materia.user_id = req.header('user_id');
    console.log(materia);
    console.log(typeof req.body)
    res.status(200).send('test')

    // materia.save()
    //     .then((result) => {
    //         res.status(200).json(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}