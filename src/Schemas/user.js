const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    userName: String,
    userAvatar: String,
    permission: String,
    infractions: {
        warns: Number,
        mutes: Number,
        kicks: Number,
        bans: Number
    },
    experience: {
        level: Number,
        xp: Number
    },
    coins: Number,
    reputation: Number,
    reputationGiven: Number,
})

module.exports = model('User', userSchema, 'users');