const Hobbie = require('../models/hobbie.js')
const mongoose = require('mongoose')
const passport = require('passport')

module.exports = {
    getHobbies,
    newHobbie,
    getSingleUserHobbies,
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


function getSingleUserHobbies  (req, res)  {
const id = req.params.id
    passport.authenticate('jwt', 
    async (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        const result = await Hobbie.find({"user_id": id}, null, {lean: true}).exec()
        if (!result) {
            throw new Error("Something went wrong while fetching user profile")
        }
        console.log(result)
        res.status(200).json(result)


        console.log(user)
    }
)(req, res)
}