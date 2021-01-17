const Hobbie = require('../models/hobbie.js')
const mongoose = require('mongoose')

module.exports = {
    getHobbies,
    newHobbie
}

function getHobbies  (req, res)  {
    Hobbie.find().sort({ createdAt: -1})
    .then((result) => {
       res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('unexpected error')
    })

}

function newHobbie  (req, res)  {
    console.log(req.body);
    const hobbie = new Hobbie(req.body);
    hobbie.user_id = req.header('user_id');
    console.log(hobbie);
    console.log(typeof req.body)
    res.status(200).send('test')

    // hobbie.save()
    //     .then((result) => {
    //         res.status(200).json(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}