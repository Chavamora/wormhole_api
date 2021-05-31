const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporteSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    substatus: {
        type: String,
        required: false,
    },
    tipo_mantenimiento: {
        type: String,
        required: false,
    },
    asignado_user_id: {
        type: String,
        required: false,
    },
    solucion: {
        type: String,
        required: false,
    },
    usuario: { // <- Nombre del usuario que contacto al agente
        type: String,
        required: true,
    },
    user_id: { // <- Id del agente/gerente que creo el reporte
        type: String,
        required: true,
    },
}, {timestamps: true});

const Reporte = mongoose.model('Reporte', reporteSchema);
module.exports = Reporte;