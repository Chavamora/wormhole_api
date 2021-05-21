const User = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const Materia = require('../models/materia.js')

module.exports = {
    getLogin,
    login
}


// Validtion example
function getLogin(req, res)  {
    passport.authenticate('jwt', 
        (err, user) => {
            if (err || !user) {
                res.status(400).send("NO VALID TOKEN")
                return false
            }

            Materia.find().sort({ createdAt: -1})
.then((result) => {
 return res.json(result);
//   return false
})
.catch((err) => {
    console.log(err);
//    return res.status(500).send('unexpected error')
// return false

})


            console.log("USER", user)
            user_custom_info = {
                ...user,
                login_dates: [
                    '2020-01-20', '2021-01-07'
                ]
            }
            res.status(200).json(user_custom_info)
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

function login (req, res, next)  {
    passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('Ocurrio un error');
              console.log(error)
              return next(error);
            }
            else {
            req.login(
              user,
              { session: false },
              async (error) => {

                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email, name: user.name, url: user.profile_picture_url, tipo: user.tipo};
                console.log('1')
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
                console.log('cuarpo' +body)
                console.log('usuario backend:' + user)

                console.log('token por enviarse ' + token)

                return res.json({ token });

              }
              
            );
            console.log('token enviado')
            }
          } catch (error) {
            console.log('error: ' + error)
            return next(error);
          }
          
        }
      )(req, res, next);
}

