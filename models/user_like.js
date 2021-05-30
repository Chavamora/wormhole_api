const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLikeSchema = new Schema({
    item_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    item_type: {
        type: String,
        required: true,
    },
    like_dislike:{
        type: String,
        required: true,
    },
}, {timestamps: true});

const UserLike = mongoose.model('UserLike', userLikeSchema);
module.exports = UserLike;