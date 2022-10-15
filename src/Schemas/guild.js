const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    guildOwnerID: String,
    guildOwnerName: String,
    guildIcon: String,
    guildMemberCount: Number,
    guildChannelCount: Number,
    guildConfig: {
        welcomeChannel: String,
        announcementChannel: String,
        logChannel: String,
        logConfig: {
            messageDelete: Boolean,
            messageUpdate: Boolean,
            messageBulkDelete: Boolean,
            messageReactionAdd: Boolean,
            messageReactionRemove: Boolean,
            messageReactionRemoveAll: Boolean,
            messageReactionRemoveEmoji: Boolean,
            channelCreate: Boolean,
            channelDelete: Boolean,
            channelUpdate: Boolean,
            channelPinsUpdate: Boolean,
            guildMemberAdd: Boolean,
            guildMemberRemove: Boolean,
            guildMemberUpdate: Boolean,
            guildBanAdd: Boolean,
            guildBanRemove: Boolean,
            guildRoleCreate: Boolean,
            guildRoleDelete: Boolean,
            guildRoleUpdate: Boolean,
            guildEmojisUpdate: Boolean,
            guildInviteCreate: Boolean,
            guildInviteDelete: Boolean,
            guildWebhooksUpdate: Boolean,
            guildUpdate: Boolean
        }
    }
});

module.exports = model('Guild', guildSchema, 'guilds');