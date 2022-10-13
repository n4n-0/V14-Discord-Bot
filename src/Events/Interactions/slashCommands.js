const { ChatInputCommandInteraction } = require('discord.js');

require('dotenv').config();
const { DEVELOPERID } = process.env;

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.reply({ content: 'This command is outdated', ephemeral: true });

        if(command.developer && interaction.user.id !== DEVELOPERID) return interaction.reply({ content: 'This command is for developers only', ephemeral: true });

        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}