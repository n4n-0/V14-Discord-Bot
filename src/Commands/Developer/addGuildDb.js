const { SlashCommandBuilder } = require('discord.js');
const Guild = require('../../Schemas/guild');
const mongoose = require('mongoose');

module.exports = {
    developer: true,

    data: new SlashCommandBuilder()
        .setName('addguild')
        .setDescription('Adds a guild to the database'),

    async execute(interaction) {
        const guild = await Guild.findOne({ guildID: interaction.guild.id });
        if(!guild) {
            const newGuild = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: interaction.guild.id,
                guildName: interaction.guild.name,
                guildOwnerID: interaction.guild.ownerId,
                guildOwnerName: interaction.guild.ownerId,
                guildIcon: interaction.guild.iconURL(),
                guildMemberCount: interaction.guild.memberCount,
                guildChannelCount: interaction.guild.channels.cache.size,
                guildConfig: {
                    welcomeChannel: '',
                    announcementChannel: '',
                    logChannel: '',
                    logConfig: {
                        messageDelete: false,
                        messageUpdate: false,
                        messageBulkDelete: false,
                        messageReactionAdd: false,
                        messageReactionRemove: false,
                        messageReactionRemoveAll: false,
                        messageReactionRemoveEmoji: false,
                        channelCreate: false,
                        channelDelete: false,
                        channelUpdate: false,
                        channelPinsUpdate: false,
                        guildMemberAdd: false,
                        guildMemberRemove: false,
                        guildMemberUpdate: false,
                        guildBanAdd: false,
                        guildBanRemove: false,
                        guildRoleCreate: false,
                        guildRoleDelete: false,
                        guildRoleUpdate: false,
                        guildEmojisUpdate: false,
                        guildInviteCreate: false,
                        guildInviteDelete: false,
                        guildWebhooksUpdate: false,
                        guildUpdate: false
                    }
                }
            });

            await newGuild.save().then(() => {
                interaction.reply({ content: 'Your Guild has been added to the database', ephemeral: true });
            }).catch((err) => {
                interaction.reply({ content: 'There was an error adding your guild to the database', ephemeral: true });
                console.log(err);
            });
        }
    }
}