const Blog = require('../models/blog.js')
const mongoose = require('mongoose')

module.exports = {
    getBlogs,
    newBlog
}

function getBlogs  (req, res)  {
    Blog.find().sort({ createdAt: -1})
    .then((result) => {
       res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('unexpected error')
    })

}

function newBlog  (req, res)  {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.user_id = req.header('user_id');
    console.log(blog);
    console.log(typeof req.body)
    res.status(200).send('test')

    // blog.save()
    //     .then((result) => {
    //         res.status(200).json(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}

