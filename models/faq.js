const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    respuesta: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Faq = mongoose.model('Faq', faqSchema);
module.exports = Faq;