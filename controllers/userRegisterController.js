const User = require('../models/user.js')
const mongoose = require('mongoose')

function register (req,res) {

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