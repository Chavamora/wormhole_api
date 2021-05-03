const Meta = require('../models/meta.js')
const mongoose = require('mongoose')
const passport = require('passport')
const ruedaDeVida = require('../models/ruedaDeVida.js')
const ruedaDeVidaM = require('../models/ruedaDeVidaM.js')

module.exports = {
    getRuedaDeVida,
    newRuedaDeVida
}

function getRuedaDeVida  (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }


        (RuedaDeVida).find().sort({ createdAt: -1})
    .then((result) => {

        if(RuedaDeVidaM) {
        (RuedaDeVidaM).find().sort({ createdAt: -1})
        .then((resu) => {
        console.log(resu)
        const RuedaDeVidaMRes = resu
        res.json(result, result)
    })


        ruedaDeVida.find({"user_id": user._id}).sort({ createdAt: -1})
        .then((result) => {
           res.json(result);

        //   return false
        })
        .catch((err) => {
            console.log(err);
        // return res.status(500).send('unexpected error')
        // return false
        
        })
        ruedaDeVidaM.find({"user_id": user._id}).sort({ createdAt: -1})
            .then((resu) => {
               res.json(resu);
            //   return false
            })
            .catch((err) => {
                console.log(err);
            // return res.status(500).send('unexpected error')
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
})(req, res)
 } )

}

function newRuedaDeVida  (req, res)  {
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