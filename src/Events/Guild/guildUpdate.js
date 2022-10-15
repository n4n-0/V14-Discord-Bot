const Guild = require('../../Schemas/guild.js');

const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = {
    name: 'guildUpdate',
    once: false,

    async execute(oldGuild, newGuild) {
        console.log(chalk.yellow(`[BOT STATUS]: ${oldGuild.name} has been updated`));
        const updatedGuild = await Guild.findOne({ guildID: newGuild.id });
        if(updatedGuild) {
            await updatedGuild.updateOne({
                guildName: newGuild.name,
                guildOwnerID: newGuild.ownerId,
                guildOwnerName: newGuild.ownerId,
                guildIcon: newGuild.iconURL(),
                guildMemberCount: newGuild.memberCount,
                guildChannelCount: newGuild.channels.cache.size
            }).then(() => {
                console.log(chalk.yellow(`[BOT STATUS]: ${newGuild.name} has been updated in the database`));
            }).catch((err) => {
                console.log(chalk.red(`[BOT ERROR]: ${newGuild.name} has not been updated in the database`));
                console.log(err);
            });
        } else {
            console.log(chalk.red(`[BOT ERROR]: ${newGuild.name} has not been found in the database`));
        }
    }
}