const UserFollows = require('../models/user_follows.js')
const passport = require('passport')
const User = require('../models/user.js')

module.exports = {
    follow,
    unfollow,
    getFollows,
    getFollowersData,
    getFollowersDataId,
}

function follow(req, res) {
    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            if (user._id === req.params.user_followed_id) {
                
                return res.status(400).json({"message": "You can fool me but you can't follow yourself"})
            }

            const following_already = await UserFollows.find({
                user_follower_id: user._id,
                user_followed_id: req.params.user_followed_id,
            }, null, {lean: true}).exec()

            if (following_already.length) {
                return res.status(400).json({"message": "You're already following this person"}) 
            }

            const follows_config  = {
                user_follower_id: user._id,
                user_followed_id: req.params.user_followed_id,
            }

            const newFollows = new UserFollows(follows_config)
            newFollows.save()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return res.status(400).json({"error": err})
            })

        }
    )(req, res)
}


function getFollows(req, res) {

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            const following_already = await UserFollows.find({
                user_follower_id: user._id,
                user_followed_id: req.params.user_followed_id,
            }, null, {lean: true}).exec()

            if (following_already.length) {
                return res.status(200).json({"following": true}) 
            }

            

        }
    )(req, res)
}

function getFollowersData(req, res) {

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            const following = await UserFollows.find({
                user_follower_id: user._id,
            }, null, {lean: true}).exec()

            console.log(following)


            const followingIds = following.map( follow => {
                return  follow.user_followed_id
            });

            


            const result = followingIds.map(async id => {
                let follower = {}
                const user = await User.findById(id, null, {lean: true}).exec()
                console.log(user)
                follower['id'] = user._id
                follower['url'] = user.profile_picture_url
                follower['name'] = user.name
                return follower
            })

        
            const followingData = await Promise.all(result)
            console.log('followingData:', followingData)


            return res.status(200).json(followingData) 
            

        }
    )(req, res)
}

function getFollowersDataId(req, res) {

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

const userID = req.params.id

            const following = await UserFollows.find({
                user_follower_id: userID,
            }, null, {lean: true}).exec()

            console.log(following)


            const followingIds = following.map( follow => {
                return  follow.user_followed_id
            });

            


            const result = followingIds.map(async id => {
                let follower = {}
                const user = await User.findById(id, null, {lean: true}).exec()
                console.log(user)
                follower['id'] = user._id
                follower['url'] = user.profile_picture_url
                follower['name'] = user.name
                return follower
            })

        
            const followingData = await Promise.all(result)
            console.log('followingData:', followingData)


            return res.status(200).json(followingData) 
            

        }
    )(req, res)
}

function unfollow(req, res) {

    passport.authenticate('jwt',
        async (err, user) => {
            if (err || !user) {
                return res.status(400).send("NO VALID TOKEN")
            }

            try {
                const removedFollows = await UserFollows.findOneAndDelete({
                    user_follower_id: user._id,
                    user_followed_id: req.params.user_followed_id,
                }).exec()

                res.status(200).json(removedFollows)
            } catch (err) {
                res.status(400).json(err)
            }

            

        }
    )(req, res)
}