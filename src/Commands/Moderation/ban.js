const { SlashCommandBuilder, EmbedBuilder, PermissionFlagBits } = require('@discordjs');
const Bans = require('../../Schemas/bans.js');
const Users = require('../../Schemas/user.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban')),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setTitle('Error')
            .setColor(0xff0000)
            .setDescription(`You do not have permission to ban ${user.username}#${user.discriminator}`);

        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [errEmbed] });

        const banProfile = await new Bans({
            _id: mongoose.Types.ObjectId(),
            userID: user.id,
            userName: user.username,
            userAvatar: user.avatarURL(),
            moderatorID: interaction.user.id,
            moderatorName: interaction.user.username,
            moderatorAvatar: interaction.user.avatarURL(),
            reason: reason,
            date: Date.now().toLocaleDateString(),
            time: Date.now().toLocaleTimeString(),
            guildID: interaction.guild.id,
            guildName: interaction.guild.name,
            guildIcon: interaction.guild.iconURL()
        });

        const userProfile = await new Users({ userID: user.id, guildID: interaction.guild.id });
        if (userProfile) {
            await userProfile.updateOne({
                infractions: {
                    bans: userProfile.infractions.bans + 1
                }
            });
        }

        await banProfile.save().then(() => {
            console.log(`[Bans] ${user.username}#${user.discriminator} has been banned from ${interaction.guild.name} for ${reason}`);
        }).catch(err => console.log(err));

        await member.ban({ reason: reason });

        const embed = new EmbedBuilder()
            .setTitle('User Banned')
            .setColor(0xff0000)
            .setDescription(`**User:** ${user.username}#${user.discriminator}\n**Moderator:** ${interaction.user.username}#${interaction.user.discriminator}\n**Reason:** ${reason}`);

        await interaction.reply({ embeds: [embed] });
    }
}