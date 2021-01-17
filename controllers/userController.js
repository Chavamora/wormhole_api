const User = require('../models/user.js')
const mongoose = require('mongoose')

module.exports = {
    getUsers,
    newUser
}

function getUsers  (req, res)  {
    User.find().sort({ createdAt: -1})
    .then((result) => {
       res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('unexpected error')
    })

}

function newUser  (req, res)  {
    console.log(req.body);
    const user = new User(req.body);
    user.user_id = req.header('user_id');
    console.log(user);
    console.log(typeof req.body)
    res.status(200).send('test')

    // user.save()
    //     .then((result) => {
    //         res.status(200).json(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}