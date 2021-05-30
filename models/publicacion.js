const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({
    cuerpo: {
        type: String,
        required: true
    },
    url:{
        type:String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required:true
    },
    likes:{
        type: Number,
        required:false,
        default:0
    },
    dislikes:{
        type: Number,
        required: false,
        default:0
    },
}, {timestamps: true});

const Publicacion = mongoose.model('Publicacion', publicacionSchema);
module.exports = Publicacion;