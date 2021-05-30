const User = require('../models/user.js')
const UserFollows = require('../models/user_follows')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require('passport')

module.exports = {
    getPerfil,
    postPerfil
}

function getPerfil  (req, res)  {

    passport.authenticate('jwt', 
    async (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        try {
            const result = await User.findOne({"_id": user._id}, null, {lean: true}).exec()
            if (!result) {
                throw new Error("Something went wrong while fetching user profile")
            }

            const followers = await UserFollows.find({user_followed_id: user._id}, "user_follower_id user_followed_id", {lean: true}).exec()
            const following = await UserFollows.find({user_follower_id: user._id}, "user_follower_id user_followed_id", {lean: true}).exec()

            result['followers'] = followers || []
            result['following'] = following || []

            res.status(200).json([result])
        } catch (err) {
            res.status(400).json(err)
        }
    }
)(req, res)


}

function postPerfil  (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }


        User.find({"_id": user._id})
        .then((result) => {
          res.json(result);
          console.log(result);
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