const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    cuerpo: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;