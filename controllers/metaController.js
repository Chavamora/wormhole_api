const Meta = require('../models/meta.js')
const mongoose = require('mongoose')

module.exports = {
    getMetas,
    newMeta
}

function getMetas  (req, res)  {
    Meta.find().sort({ createdAt: -1})
    .then((result) => {
       res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('unexpected error')
    })

}

function newMeta  (req, res)  {
    console.log(req.body);
    const meta = new Meta(req.body);
    meta.user_id = req.header('user_id');
    console.log(meta);
    console.log(typeof req.body)
    res.status(200).send('test')

    // meta.save()
    //     .then((result) => {
    //         res.status(200).json(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}