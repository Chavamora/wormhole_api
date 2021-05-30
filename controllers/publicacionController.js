const Publicacion = require('../models/publicacion.js')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { response } = require('express')
const { cloudinary } = require('../utils/cloudinary')

module.exports = {
    getAllPublicaciones,
    postPublicacion,
    getSinglePublicacion
}

function getAllPublicaciones(req, res) {
    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            const publicacionDocList = await Publicacion.find().sort({ createdAt: -1 })
            const objectPublicacionList = publicacionDocList.map(async (publicacionDoc) => {
                const publicacion = publicacionDoc.toObject()
                const userDoc = await User.findById(publicacion.user_id)
                const userObj = userDoc.toObject()
                const username = userObj.name
                const url = userObj.profile_picture_url
                publicacion['url_user'] = url
                publicacion['name'] = username
                return publicacion
            })

            const response = await Promise.all(objectPublicacionList)
            
            console.log('response:', response)
            res.json(response)
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
                .then((publicacionDoc) => {
                    const publicacion = publicacionDoc.toObject();
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