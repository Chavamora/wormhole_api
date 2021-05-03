const Blog = require('../models/blog.js')
const mongoose = require('mongoose')
const passport = require('passport')

module.exports = {
    getBlogs,
    newBlog
}

function getBlogs  (req, res)  {
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }


        Blog.find({"user_id": user._id}).sort({ createdAt: -1})
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

function newBlog  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        console.log(req.body);
        const blog = new Blog(req.body);
        blog.user_id = user._id;
        console.log(blog);
        console.log(typeof req.body)

        blog.save()
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

