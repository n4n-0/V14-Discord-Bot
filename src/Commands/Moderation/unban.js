const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user from the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName('user').setDescription('The user to unban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the unban')),

    async execute(interaction) {
        const options = interaction.options;

        const userId = interaction.guild.members.unban('userid');

        try {
            await interaction.guild.members.unban(userId);
            const embed = new EmbedBuilder()
                .setTitle('User Unbanned')
                .setColor(0x00ff00)
                .setDescription(`**User:** ${user.username}#${user.discriminator}\n**Moderator:** ${interaction.user.username}#${interaction.user.discriminator}\n**Reason:** ${reason}`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch {
            const embed = new EmbedBuilder()
                .setTitle('Error')
                .setColor(0xff0000)
                .setDescription(`Failed to unban ${user.username}#${user.discriminator}`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }
    }
}