const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profile_picture_url: {
        type: String,
        required: false
    },
    tipo: {
        type: Number,
        default: 1 // <- 1: user, 2: faqs editor, 3: Agente reportes, 4: gerente reportes, 5: desarrollador
    },
    biografia: {
        type: String,
        default: 'Haz clic en editar biografía para añadir la tuya',
        required: false,
    },
    frase: {
        type: String,
        default: 'haz click en editar para agregar una frase',
        required: false,
    }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     }, 
//     password: {
//         type: String,
//         required: true
//     },
//     profilePicture: {
//         data: Buffer,
//         contentType: String
//     },
//     coverPhoto: {
//         data: Buffer,
//         contentType: String
//     }
// }, {timestamps: true});

// const User = mongoose.model('User', userSchema);
// module.exports = User;



