const blogRoutes = require('./blogRoutes')
const deporteRoutes = require('./deporteRoutes')
const hobbieRoutes = require('./hobbieRoutes')
const materiaRoutes = require('./materiaRoutes')
const metaRoutes = require('./metaRoutes')
const userLoginRoutes = require('./userLoginRoutes')
const userRegisterRoutes = require('./userRegisterRoutes')

module.exports = app => {
    blogRoutes(app)
    deporteRoutes(app)
    hobbieRoutes(app)
    materiaRoutes(app)
    metaRoutes(app)
    userLoginRoutes(app)
    userRegisterRoutes(app)
}