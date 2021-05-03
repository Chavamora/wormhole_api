const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const User = require("../models/user");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'usuario no encontrado' });
                    }
            
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
            
                        if (isMatch) {
                            return done(null, user, { message: "Inicio de sesion correcto"});
                        } else {
                            return done(null, false, { message: 'Contraseña incorrecta' });
                        }
                    })
                })
                .catch((err) => { console.log(err) })
            }
        )
    );

    passport.use(
        new JWTstrategy(
            {
                secretOrKey: 'TOP_SECRET',
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
}; 