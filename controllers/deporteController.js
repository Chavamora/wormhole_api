const Deporte = require('../models/deporte.js')
const mongoose = require('mongoose')

module.exports = {
    getDeportes,
    newDeporte
}

function getDeportes  (req, res)  {
    Deporte.find().sort({ createdAt: -1})
    .then((result) => {
       res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('unexpected error')
    })

}

function newDeporte  (req, res)  {
    console.log(req.body);
    const deporte = new Deporte(req.body);
    deporte.user_id = req.header('user_id');
    console.log(deporte);
    console.log(typeof req.body)
    res.status(200).send('test')

    // deporte.save()
    //     .then((result) => {
    //         res.status(200).json(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}