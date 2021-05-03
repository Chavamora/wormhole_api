const Hobbie = require('../models/hobbie.js')
const mongoose = require('mongoose')
const passport = require('passport')

module.exports = {
    getHobbies,
    newHobbie
}

function getHobbies  (req, res)  {
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }


        Hobbie.find({"user_id": user._id}).sort({ createdAt: -1})
        .then((result) => {
          res.json(result);
        //   return false
        })
        .catch((err) => {
            console.log(err);
        //    return res.status(500).send('unexpected error')
        // return false
        
        })


        console.log(user)

        
        // console.log("USER", user)
        // user_custom_info = {
        //     ...user,
        //     login_dates: [
        //         '2020-01-20', '2021-01-07'
        //     ]
        // }
        // res.status(200).json(user_custom_info)
        // User.find().sort({ createdAt: -1})
        // .then((result) => {
        //     res.status(200).json(result);
        // })
        // .catch((err) => {
        //     console.log(err);
        //     res.status(500).send('unexpected error')
        // })
    }
)(req, res)

}

function newHobbie  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        console.log(req.body);
        const hobbie = new Hobbie(req.body);
        hobbie.user_id = user._id;
        console.log(hobbie);
        console.log(typeof req.body)

        hobbie.save()
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