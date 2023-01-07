const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const User = require('../../Schemas/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the kick')),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        
        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setTitle('Error')
            .setColor(0xff0000)
            .setDescription(`You do not have permission to kick ${user.username}#${user.discriminator}`);

        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [errEmbed] });

        const userProfile = await User.findOne({ userID: user.id, guildID: interaction.guild.id });
        if (userProfile) {
            await userProfile.update({
                infractions: {
                    kicks: userProfile.infractions.kicks + 1
                }
            });
        }

        await member.kick({ reason: reason });

        const embed = new EmbedBuilder()
            .setTitle('User Kicked')
            .setColor(0xff0000)
            .setDescription(`**User:** ${user.username}#${user.discriminator}\n**Moderator:** ${interaction.user.username}#${interaction.user.discriminator}\n**Reason:** ${reason}`)
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
}