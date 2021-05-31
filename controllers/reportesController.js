const Reporte = require('../models/reporte.js')
const HistorialReporte = require('../models/historialReporte.js')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { response } = require('express')

module.exports = {
    getReportes,
    crearReporte,
    updateReporte,
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

function getReportes(req, res) {
    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            if (user.tipo != 3 && user.tipo != 4 & user.tipo != 5) {
                return res.status(400).json({"mensaje": "No tienes los permisos necesarios"})
            }

            const filters = user.tipo === 5 ? {asignado_user_id: user._id, substatus: {$not: 'programacion_finalizada'}} : {}

            const reportDocList = await Reporte.find(filters).sort({ createdAt: -1 })
            globalReportDocList = reportDocList
            objectReportList = globalReportDocList.map(async (reportDoc) => {
                var report = reportDoc.toObject()
                const userDoc = await User.findById(report.user_id)
                userObj = userDoc.toObject()
                const username = userObj.name
                const url = userObj.profile_picture_url
                report['url'] = url
                report['name'] = username
                report['tipo'] = user.tipo

                return report
            })

            const response = await Promise.all(objectReportList)
            console.log('response:', response)
            res.json(response)
        }
    )(req, res)

}

function crearReporte(req, res) {
    console.log(req.body);

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            try {
                const user = await User.findOne({name: req.body.usuario}, null, {lean: true}).exec()
                if (!user) {
                    throw new Error('El id de usuario que ingresó no está registrado en la base de datos.')
                }

                const reporte = new Reporte(req.body)
                reporte['user_id'] = user._id;
                const reporteNuevo = await reporte.save({lean: true})

                const historialCreacion = new HistorialReporte({
                    id_reporte: reporteNuevo._id,
                    field: 'reporte',
                    new_value: 'created',
                    id_user_modifying: user._id,
                });

                historialCreacion.save()

                res.status(200).json(reporteNuevo)

            } catch (error) {
                res.status(400).json(error)
            }
        })(req, res)
}


function updateReporte(req, res) {
    console.log(req.body);

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            try {
                const reporteID = req.query.reporteID;
                const reporteOriginal = await Reporte.findById(reporteID, null, {lean: true}).exec()
                const body = req.body

                if (
                    (('status' in body || 'asignado_user_id' in body) && user.tipo != 4) || 
                    (('titulo' in body || 'descripcion' in body) && (user.tipo != 4 || user.tipo != 3)) ||
                    (('solucion' in body) && (user.type != 4 || user.type != 5)) || 
                    ('substatus' in body && user.type != 5) || 
                    (('solucion' in body || 'substatus' in body) && (user.type === 5 && user._id != reporteOriginal.asignado_user_id))
                ) {
                    throw new Error('Tu usuario no tiene los permisos necesarios')
                }

                const nuevoReporte = await Reporte.findByIdAndUpdate(reporteID, body, {lean: true, new: true}).exec()

                const historyRecordsPromises = Object.keys(body).reduce((acc, field) => {
                    if (nuevoReporte[field] != reporteOriginal[field]) {
                        const record = HistorialReporte({
                            id_reporte: nuevoReporte._id,
                            field: field,
                            new_value: nuevoReporte[field],
                            id_user_modifying: user._id,
                        })

                        acc.push(record.save())
                    }
                    
                    return acc
                }, [])

                Promise.all(historyRecordsPromises)

                res.status(200).json(nuevoReporte)
            } catch (error) {
                res.status(400).json(error)
            }
        })(req, res)
}


function getSingleReporte(req, res) {
    const reporte_id = req.query.reporteID
    console.log('id del reporte:', reporte_id)
    
    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            if (user.tipo != 3 && user.tipo != 4 & user.tipo != 5) {
                return res.status(400).json({"mensaje": "No tienes los permisos necesarios"})
            }

            try {
                const report = await Reporte.findById(reporte_id, null, {lean: true}).exec()
                const reportUser = await User.findById(report.user_id, null, {lean: true}).exec()
                const historial = await HistorialReporte.find({id_reporte: report._id}).sort({createdAt: -1}).exec()

                report['name'] = reportUser.name
                report['url'] = reportUser.profile_picture_url
                report['loggedAvatar'] = user.url
                report['loggedUserName'] = user.name
                report['tipo'] = user.tipo
                report['historial'] = historial

                res.status(200).json(report)
            } catch (error) {
                console.log('>:C', error)
                res.status(400).json(error)
            }

    })(req, res)
}



function postReporte(req, res) {
    console.log(req.body);

    passport.authenticate('jwt',
        (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            User.findOne({ name: req.body.usuario })
                .then((result) => {
                    if (result == undefined || result == null) {
                        let error = 'El id de usuario que ingresó no está registrado en la base de datos.'
                        res.status(400).json({ error: error })

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

function postSingleReporte(req, res) {

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

function editReporte(req, res) {
    console.log(req.body)
    const reporte_id = req.query.reporteID
    const tag = req.body
    passport.authenticate('jwt',
        (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            Reporte.findByIdAndUpdate(
                { _id: reporte_id },
                { tags: tag })
                .then((reporte) => {
                    res.json(reporte)
                    console.log('userconurl', reporte)
                })
                .then((reportDoc) => {

                })

        }
    )(req, res)
}

function editReporteComplete(req, res) {
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
                { _id: reporte_id },
                {
                    titulo: titulo,
                    descripcion: descripcion
                })
                .then((reporte) => {
                    res.json(reporte)
                    console.log('reporteMod', reporte)
                })

        }
    )(req, res)

}

function deleteReporte(req, res) {
    const reporte_id = req.query.reporteID
    passport.authenticate('jwt',
        (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            Reporte.findByIdAndDelete(reporte_id)
                .then(result => {
                    res.json({ redirect: '/reportes' })
                })
                .catch(err => {
                    console.log(err)
                })

        }
    )(req, res)

}