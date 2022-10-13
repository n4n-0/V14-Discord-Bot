const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

require('dotenv').config();
const { TOKEN } = process.env;

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel } = Partials

const { loadEvents } = require('./Handlers/eventHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember, Channel]
});

client.events = new Collection();
client.commands = new Collection();
loadEvents(client);

client.login(TOKEN);