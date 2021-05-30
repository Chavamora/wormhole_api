const Publicacion = require('../models/publicacion.js')
const User = require('../models/user.js')
const UserFollows = require('../models/user_follows')
const UserLikes = require('../models/user_like.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { response } = require('express')
const { cloudinary } = require('../utils/cloudinary')
const UserLike = require('../models/user_like.js')
const { follow } = require('./followsController.js')

module.exports = {
    getAllPublicaciones,
    postPublicacion,
    getSinglePublicacion,
    likeDislikePost,
    removeLikeDislikePost
}

function getAllPublicaciones(req, res) {
    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            try {
                let following = await UserFollows.find({user_follower_id: user._id}, "user_followed_id", {lean: true}).exec()
                following = await following.map(followed => followed.user_followed_id)
                console.log("FOLLOWING", following)

                const filters = following.length ? {user_id: [...following, user._id]} : {}

                const postsDocList = await Publicacion.find(filters).sort({ createdAt: -1 })
                const postsObjectsPromises = postsDocList.map(async (postDoc) => {
                    const post = postDoc.toObject()
                    const userDoc = await User.findById(post.user_id)
                    const userObj = userDoc.toObject()
                    const username = userObj.name
                    const url = userObj.profile_picture_url
                    post['url_user'] = url
                    post['name'] = username
                    return post
                })

                const posts = await Promise.all(postsObjectsPromises)

                const postsIds = posts.map(post => post._id)

                const postsLikes = await UserLike.find({item_type: 'post', item_id: postsIds}, null, {lean: true}).exec()
                const postsLikesCount = postsLikes.reduce((reducer, item) => {
                    console.log(reducer)
                    let count = {post_id: item.item_id, likes: 0, dislikes: 0, user_action: null}

                    if (item.item_id in reducer) {
                        count = reducer[item.item_id];
                    }

                    if (item.like_dislike === 'like') {
                        count.likes = count.likes + 1
                    } else if (item.like_dislike === 'dislike') {
                        count.dislikes = count.dislikes + 1
                    }

                    if (item.user_id === user._id) {
                        count.user_action = item.like_dislike
                    }

                    reducer[item.item_id] = count

                    return reducer
                }, {})

                const fullPosts = posts.map(post => ({...post, ...postsLikesCount[post._id]}))

                console.log("FULLPOSTS", fullPosts)
                
                // console.log('response:', posts)
                res.json(fullPosts)
            } catch(error) {
                console.log(error)
                res.status(400).json(error)
            }
        }
    )(req, res)

}

function postPublicacion(req, res) {
    console.log(req.body);

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            const publicacion = new Publicacion()
            publicacion.cuerpo = req.body.cuerpo
            publicacion.user_id = user._id


            if (req.body.data) {
                try {
                    const fileStr = req.body.data;
                    console.log(fileStr)
                    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                        upload_preset: 'post_images'
                    })
                    console.log(uploadedResponse)
                    const url = uploadedResponse.secure_url

                    publicacion.url = url
                    publicacion.usuario = user.name
                    publicacion.save()
                        .then(
                            res.status(200).json(publicacion))
                        .catch((err) => {
                            console.log(err);
                        })
                        .catch(error => console.log(error))

                } catch (error) {
                    console.error(error)
                    res.status(500).json({ err: 'something went wrong' })
                }





            } else {
                try {
                    publicacion.user_id = user._id
                    publicacion.usuario = user.name
                } catch (error) {
                    console.error(error)
                    res.status(500).json({ err: 'something went wrong' })
                }
                publicacion.save()
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .catch(error => console.log(error))
            }

        })(req, res)
}

function getSinglePublicacion(req, res) {
    const publicacion_id = req.query.postID
    passport.authenticate('jwt',
        (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }
            const userLoggedAvatarUrl = user.url
            userLoggedName = user.name
            usertype = user.tipo

            Publicacion.findById(publicacion_id)
                .then((postDoc) => {
                    const publicacion = postDoc.toObject();
                    console.log('publicacion: ', publicacion)
                    User.findById(publicacion.user_id)
                        .then((userDoc) => {
                            const user = userDoc.toObject();
                            const name = user.name
                            const url = user.profile_picture_url

                            publicacion.name = name
                            publicacion.url_user = url
                            publicacion['loggedAvatar'] = userLoggedAvatarUrl
                            publicacion['loggedUserName'] = userLoggedName
                            publicacion['tipo'] = usertype
                            res.json(publicacion)
                        })
                })
                .catch((err) => {
                    console.log(err);
                })

        }
    )(req, res)

}

function likeDislikePost(req, res) {

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }
            
            const postId = req.params.post_id
            const likeDislike = req.query.like_dislike

            const selectedPost = await UserLike.findOneAndUpdate(
                {item_id: postId, item_type: 'post', user_id: user._id},
                {like_dislike: likeDislike}, 
                {lean: true, upsert: true}
            ).exec()
            console.log("UPDATED LIKE FROM POST", selectedPost)

            res.status(200).send(selectedPost)
        }
    )(req, res)

}


function removeLikeDislikePost(req, res) {

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }
            
            const postId = req.params.post_id
            const likeDislike = req.query.like_dislike

            const removedPost = await UserLike.findOneAndDelete(
                {item_id: postId, item_type: 'post', user_id: user._id, like_dislike: likeDislike},
            ).exec()
            console.log("REMOVED LIKED FROM POST", removedPost)

            res.status(200).json(removedPost)
        }
    )(req, res)

}
