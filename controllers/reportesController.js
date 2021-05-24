const Reporte = require('../models/reporte.js')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { response } = require('express')

module.exports = {
    getReportes,
    postReporte,
    getSingleReporte,
    postSingleReporte,
    editReporte,
    deleteReporte,
    editReporteComplete
}
var reportWithAuthorList = []
var objectReportList = []
var globalReportDocList = []
var reportsAuthorList = []
var userLoggedAvatarUrl = ''

function getReportes (req, res)  {
    passport.authenticate('jwt', 
    async (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        const reportDocList = await Reporte.find().sort({createdAt: -1})
            globalReportDocList = reportDocList
            objectReportList = globalReportDocList.map(async (reportDoc) =>{
                var report = reportDoc.toObject()
                const userDoc = await User.findById(report.user_id)
                userObj = userDoc.toObject()
                const username =  userObj.name
                const url = userObj.profile_picture_url
                report['url'] = url
                report['name'] =  username
                report['tipo'] = user.tipo
                
            return report
    })


    const response = await Promise.all(objectReportList)
    console.log('response:', response)
    res.json(response)
    }
)(req, res)
    
}

function postReporte  (req, res)  {
    console.log(req.body);

    passport.authenticate('jwt', 
     (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        User.findOne({name:req.body.usuario})
        .then((result)=>{
            if (result==undefined || result == null) {
                let error = 'El id de usuario que ingresó no está registrado en la base de datos.'
                res.status(400).json({error:error})
    
            } else {
                const reporte = new Reporte(req.body);

            reporte['user_id'] = user._id;
            console.log(reporte);
            console.log(req.body);
    
            reporte.save()
            .then((result) => {
            res.status(200).json(result);
             })
            .catch((err) => {
            console.log(err);
            })
            .catch(error => console.log(error))
        }    
        })
    
    })(req, res)
}

function getSingleReporte  (req, res)  {
    const reporte_id = req.query.reporteID
    console.log('id del reporte:', reporte_id)
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }
        userLoggedAvatarUrl = user.url
        userLoggedName = user.name
        usertype = user.tipo

        Reporte.findById(reporte_id)
            .then((reportDoc) => {
                const report = reportDoc.toObject();
                console.log('reporte: ', report)
                User.findById(report.user_id)
                .then((userDoc) => {
                    const user = userDoc.toObject();
                    const name = user.name 
                    const url = user.profile_picture_url
  
                    report.name = name
                    report.url = url
                    report['loggedAvatar'] = userLoggedAvatarUrl
                    report['loggedUserName'] = userLoggedName 
                    report['tipo'] = usertype
                    res.json(report)
                })
            })
            .catch((err) => {
                console.log(err);
            })
       
    }
    )(req, res)
}

function postSingleReporte  (req, res)  {

    const reporte_id = req.params.id
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        Reporte.findById(reporte_id)
            .then((result) => {
                res.json(result)
                console.log(res.json(result))
            })
            .catch((err) => {
                console.log(err);
            })
    }
    )(req, res)
}

function editReporte (req, res)  {
    console.log(req.body)
    const reporte_id = req.query.reporteID
    const tag = req.body
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        Reporte.findByIdAndUpdate(
            {_id: reporte_id}, 
            {tags: tag})      
            .then((reporte) => {
            res.json(reporte)
            console.log('userconurl', reporte)
            })
        .then((reportDoc) => {
            
        })

    }
    )(req, res)
}

function editReporteComplete (req, res)  {
    console.log(req.body)
    const reporte_id = req.query.reporteID
    const titulo = req.body.titulo
    const descripcion = req.body.descripcion
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        Reporte.findByIdAndUpdate(
            {_id: reporte_id}, 
            {titulo: titulo,
            descripcion: descripcion})      
            .then((reporte) => {
            res.json(reporte)
            console.log('reporteMod', reporte)
            })

    }
    )(req, res)
   
}

function deleteReporte  (req, res)  {
    const reporte_id = req.query.reporteID
    passport.authenticate('jwt', 
    (err, user) => {
        if (err || !user) {
            return res.status(400).send("NO VALID TOKEN")   
        }

        Reporte.findByIdAndDelete(reporte_id)
        .then(result => {
            res.json({redirect: '/reportes'})
        })
        .catch(err => {
        console.log(err)
        })

    }
    )(req, res)
   
}