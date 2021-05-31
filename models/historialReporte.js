const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialReporteSchema = new Schema({
    id_reporte: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: true,
    },
    new_value: {
        type: String,
        required: true
    },
    id_user_modifying: {
        type: String,
        required: true
    }
}, {timestamps: true});

const HistorialReporte = mongoose.model('HistorialReporte', historialReporteSchema);
module.exports = HistorialReporte;