const Deporte = require('../models/deporte.js')
const mongoose = require('mongoose')
const passport = require('passport')

module.exports = {
    getDeportes,
    newDeporte,
    getSingleUserDeportes,
}

function getDeportes  (req, res)  {
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }


        Deporte.find({"user_id": user._id}).sort({ createdAt: -1})
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

function newDeporte  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        console.log(req.body);
        const deporte = new Deporte(req.body);
        deporte.user_id = user._id;
        console.log(deporte);
        console.log(typeof req.body)

        deporte.save()
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

function getSingleUserDeportes  (req, res)  {
    console.log(req.body);
    const id = req.params.id

    passport.authenticate('jwt', 
    async (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        const result = await Deporte.find({"user_id": id}, null, {lean: true}).exec()
        if (!result) {
            throw new Error("Something went wrong while fetching user profile")
        }
        console.log(result)
        res.status(200).json(result)


        console.log(user)
    }
)(req, res)
}

