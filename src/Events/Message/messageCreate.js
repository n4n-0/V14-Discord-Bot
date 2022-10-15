const User = require('../../Schemas/user.js');

const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = {
    name: 'messageCreate',
    once: false,

    async execute(message) {
        if(message.author.bot) return;
        if(message.channel.type == "DM") return;

        const user = await User.findOne({ userID: message.author.id });
        if(!user) {
            const newUser = await new User({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                userName: message.author.username,
                userAvatar: message.authro.avatarURL(),
                permission: 'user',
                infractions: {
                    warns: 0,
                    mutes: 0,
                    kicks: 0,
                    bans: 0
                },
                experience: {
                    level: 0,
                    xp: 0
                },
                coins: 0,
                reputation: 0,
                reputationGiven: 0,
            });

            await newUser.save().then(() => {
                console.log(chalk.green(`[MongoDB] New user ${message.author.username} has been added to the database.`));
            }).catch(err => {
                console.log(chalk.red(`[MongoDB] Error while adding new user ${message.author.username} to the database.`));
            });
        }

    }
}