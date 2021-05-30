const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFollowsSchema = new Schema({
    user_follower_id: {
        type: String,
        required: true,
    },
    user_followed_id: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const UserFollows = mongoose.model('UserFollows', userFollowsSchema);
module.exports = UserFollows;