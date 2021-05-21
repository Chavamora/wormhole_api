const Comment = require('../models/comment.js')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = {
    getComments,
    postComment,
}

var objectCommentList = []
var globalCommentDocList = []

function getComments (req, res)  {
const reporte_id = req.query.reporteID
// console.log('reporte comentado: ', reporte_id)
    passport.authenticate('jwt', 



    async (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        const commentDocList = await Comment.find({'post_id': reporte_id}).sort({ createdAt: -1})
        globalCommentDocList = commentDocList
            objectCommentList = globalCommentDocList.map(async (commentDoc) =>{
                var comment = commentDoc.toObject()
                const userDoc = await User.findById(comment.user_id)
                userObj = userDoc.toObject()
                const username =  userObj.name
                const url = userObj.profile_picture_url
                comment['url'] = url
                comment['name'] =  username
            return comment
    })
    const response = await Promise.all(objectCommentList)
    // console.log('response:', response)
    res.json(response)

    }
)(req, res)
    
}

function postComment  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        const comment = new Comment(req.body);

        comment['user_id'] = user._id;
        console.log(comment);
        console.log(req.body);
    
        comment.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    )(req, res)
}

