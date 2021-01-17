const blogRoutes = require('./blogRoutes')
const deporteRoutes = require('./deporteRoutes')
const hobbieRoutes = require('./hobbieRoutes')
const materiaRoutes = require('./materiaRoutes')
const metaRoutes = require('./metaRoutes')
const userRoutes = require('./userRoutes')


module.exports = app => {
    blogRoutes(app)
    deporteRoutes(app)
    hobbieRoutes(app)
    materiaRoutes(app)
    metaRoutes(app)
    userRoutes(app)
}