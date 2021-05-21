const User = require('../models/user.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport');


module.exports = {
    getRegister,
    register
}

function register (req,res) {

    const {name, email, password, password2} = req.body;
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
        //errors.push({msg : "Por favor llena todos los campos"})
        console.error('Faltan campos')
        errors.push('faltan campos')
        res.status(400).json({errors: errors})
        return false

    }
    //check if match
    if(password !== password2) {
        errors.push('Las contraseñas no coinciden');
       console.error('Las contraseñas no coinciden')
       res.status(400).json({errors: errors})
       return false

    }
    
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        //errors.push({msg : 'Tu contraseña debe contener al menos 6 caracteres'})
        res.status(500).send('unexpected error')
      return false

    }
    if(errors.length > 0 ) {
    // res.render('register', {
    //     errors : errors,
    //     name : name,
    //     email : email,
    //     password : password,
    //     password2 : password2,
    //     title: 'register'})
    console.log('some error')
    res.status(500).send('unexpected error')
    } else {
        //validation passed
       User.findOne({email : email}).exec((err,user)=>{
           console.log('hola')        
           console.log(user);   
        if(user) {
            errors.push('este email ya está registrado');
            // res.render('register',{errors,name,email,password,password2, title: 'register'})
            console.log('email registrado')
            res.status(400).json({errors: errors})

           } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });
            console.log('usuario creado')
               //hash password
               bcrypt.genSalt(10,(err,salt)=> 
               bcrypt.hash(newUser.password,salt,
                   (err,hash)=> {
                       if(err) throw err;
                       console.log(err)
                           //save pass to hash
                           newUser.password = hash;
                       //save user
                       newUser.save()
                       .then((value)=>{
                           console.log(value)
                           console.log('registro exitoso')
                           errors.push('registro exitoso')
                           res.status(200).json({errors: errors})
                        
                    //        req.flash('success_msg','tu registro fue exitoso!')
                    //    res.redirect('/users/login');
                       })
                       .catch(value=> console.log(value));
                         
                   }
                   )
                   
                   );
                   
                } //ELSE statement ends here
        })
    }
};


function getRegister (req,res) {

    const {name, email, password, password2} = req.body;
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
        errors.push({msg : "Por favor llena todos los campos"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "Las contraseñas no coinciden"});
    }
    
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'Tu contraseña debe contener al menos 6 caracteres'})
    }
    if(errors.length > 0 ) {
    // res.render('register', {
    //     errors : errors,
    //     name : name,
    //     email : email,
    //     password : password,
    //     password2 : password2,
    //     title: 'register'})
    console.log('some error')
    } else {
        //validation passed
       User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'este email ya está registrado'});
            // res.render('register',{errors,name,email,password,password2, title: 'register'})
            
           } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });

               //hash password
               bcrypt.genSalt(10,(err,salt)=> 
               bcrypt.hash(newUser.password,salt,
                   (err,hash)=> {
                       if(err) throw err;
                           //save pass to hash
                           newUser.password = hash;
                       //save user
                       newUser.save()
                       .then((value)=>{
                           console.log(value)
                    //        req.flash('success_msg','tu registro fue exitoso!')
                    //    res.redirect('/users/login');
                       })
                       .catch(value=> console.log(value));
                         
                   }));
                } //ELSE statement ends here
        })
    }
};