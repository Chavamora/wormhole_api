var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var port = process.env.PORT || '3000'
var fs = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken')
const passport = require('passport')


var imgModel = require('../models/image.js');

var multer = require('multer');
 
module.exports = {
    getImage,
    postImage
}

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({ storage: storage });



function getImage (req, res)  {

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        // imgModel.find({}, (err, items) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(500).send('An error occurred');
        //     }

            
        //     else {
        //         res.render('imagesPage', { items: items });
        //     }
        // });
        console.log('hola')
        imgModel.find({"user_id": user._id}).sort({ createdAt: -1})
        .then((result) => {
          res.json(result);
        //   return false
        console.log('hola2')

        })
        .catch((err) => {
            console.log(err);
        //    return res.status(500).send('unexpected error')
        // return fals
        })
        console.log(user)
        
    }
)(req, res)    
}

function postImage (req, res)  {

    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
}
    // if (!req.file) {
    //     console.log("No file received");
    //     return res.send({
    //       success: false
    //     });
    
    //   } else {
    //     console.log('file received');
    //     return res.send({
    //       success: true
    //     })
    //   }
    // }

   

        // console.log(req.body);
        // const materia = new Materia(req.body);
        // console.log(materia);
    

        // materia.save()
        // .then((result) => {
        //     res.status(200).json(result);

        // })
        // .catch((err) => {
        //     console.log(err);
        // })

        // var obj = {
        //     name: req.body.name,
        //     desc: req.body.desc,
        //     img: {
        //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //         contentType: 'image/png'
        //     }
        // }
    //     console.log(fs.readFile(req.body))
    //     var myReader = new FileReader()
    //  myReader.onload = function(event){
    //      console.log(JSON.stringify(myReader.result));
    //  };
    //  myReader.readAsText(req.body);
//     console.log('uno')
//     console.log(req)
//     console.log(req.body)






//     passport.authenticate('jwt', 
//     (err, user) => {
//         if (err || !user) {
//             console.log('error '  + err)

//             return res.status(400).send("NO VALID TOKEN")   

//         }
//         console.log('uno')
//         imgModel.create(body, (err, item) => {
//             console.log('dos')

//             if (err) {
//                 console.log(err);
//                 console.log('error')

//             }
//             else {
//                 // item.save();
//                 console.log('tres')

//                 res.redirect('/');
//                 console.log('cuatro')

//             }
//             console.log('cinco')

//         });
//         imgModel.user_id = user._id;

//         console.log(user + '1')
//         console.log(imgModel);

//     }
//     )(req, res)
// }