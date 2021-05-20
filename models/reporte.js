const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporteSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Reporte = mongoose.model('Reporte', reporteSchema);
module.exports = Reporte;