const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

require('dotenv').config();
const { TOKEN } = process.env;

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel } = Partials

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember, Channel]
});

client.login(TOKEN).then(() => {
    console.log('Logged in');
});