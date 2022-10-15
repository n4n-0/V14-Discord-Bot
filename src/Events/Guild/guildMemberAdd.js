const User = require('../../Schemas/user.js');

const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    async execute(member) {
        console.log(chalk.green(`[BOT STATUS]: ${member.user.username} has joined ${member.guild.name}`));
        const newUser = await user.findOne({ userID: member.id });
        if(!newUser) {
            const userProfile = new User({
                _id: mongoose.Types.ObjectId(),
                userID: member.id,
                userName: member.user.username,
                userAvatar: member.user.avatarURL(),
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
                reputationGiven: 0
            });

            await userProfile.save().then(() => {
                console.log(chalk.green(`[BOT STATUS]: ${member.user.username} has been added to the database`));
            }).catch((err) => {
                console.log(chalk.red(`[BOT ERROR]: ${member.user.username} has not been added to the database`));
                console.log(err);
            });
        } else {
            console.log(chalk.red(`[BOT ERROR]: ${member.user.username} has already been added to the database`));
        }
    }
}