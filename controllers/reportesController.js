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
    postSingleReporte
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
    }
    )(req, res)
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

        Reporte.findById(reporte_id)
            .then((reportDoc) => {
                const report = reportDoc.toObject();

                User.findById(report.user_id)
                .then((userDoc) => {
                    const user = userDoc.toObject();
                    const name = user.name 
                    const url = user.profile_picture_url
                    console.log(user.profile_picture_url)

                    console.log('REPORTE: ' + report)
                    console.log('REPORTE HECHO POR: ' + user)
                    
                    report.name = name
                    report.url = url
                    report['loggedAvatar'] = userLoggedAvatarUrl
                    report['loggedUserName'] = userLoggedName 
                    console.log(typeof report)
                    console.log('REPORTE MAS USUARIO: ' + JSON.stringify(report))
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