const Guild = require('../../Schemas/guild');

const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
    name: 'guildCreate',
    once: false,

    async execute(guild) {
        console.log(chalk.green(`[BOT STATUS]: ${guild.name} has been added to the bot`));
        const guildDB = await Guild.findOne({ guildID: guild.id });
        if(!guildDB) {
            const newGuild = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: guild.id,
                guildName: guild.name,
                guildOwnerID: guild.ownerId,
                guildOwnerName: guild.ownerId,
                guildIcon: guild.iconURL(),
                guildMemberCount: guild.memberCount,
                guildChannelCount: guild.channels.cache.size,
                guildConfig: {
                    welcomeChannel: '',
                    announcementChannel: '',
                    logChannel: '',
                    logConfig: {
                        messageDelete: true,
                        messageUpdate: false,
                        messageBulkDelete: true,
                        messageReactionAdd: false,
                        messageReactionRemove: false,
                        messageReactionRemoveAll: false,
                        messageReactionRemoveEmoji: false,
                        channelCreate: true,
                        channelDelete: true,
                        channelUpdate: true,
                        channelPinsUpdate: false,
                        guildMemberAdd: true,
                        guildMemberRemove: true,
                        guildMemberUpdate: false,
                        guildBanAdd: true,
                        guildBanRemove: true,
                        guildRoleCreate: true,
                        guildRoleDelete: true,
                        guildRoleUpdate: true,
                        guildEmojisUpdate: false,
                        guildInviteCreate: true,
                        guildInviteDelete: false,
                        guildWebhooksUpdate: true,
                        guildUpdate: true
                    }
                }
            });

            await newGuild.save().then(() => {
                console.log(chalk.green(`[BOT STATUS]: ${guild.name} has been added to the database`));
            }).catch((err) => {
                console.log(chalk.red(`[BOT ERROR]: ${guild.name} has not been added to the database`));
                console.log(err);
            });
        } else {
            console.log(chalk.yellow(`[BOT STATUS]: ${guild.name} is already in the database`));
        }
    }
}