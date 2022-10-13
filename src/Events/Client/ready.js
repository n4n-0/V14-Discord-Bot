const { ActivityType } = require('discord.js');
const { loadCommands } = require('../../Handlers/commandHandler');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        
        client.user.setPresence({
            activities: [{ name: 'with our v14 Discord Bot', type: ActivityType.PLAYING }],
            status: 'dnd'
        });

        loadCommands(client);
    }
}