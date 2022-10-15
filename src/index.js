const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { connect } = require('mongoose');
const chalk = require('chalk');

require('dotenv').config();
const { TOKEN, MONGOURL } = process.env;

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
(async () => {
    await connect(MONGOURL).then(() => {
        console.log(chalk.green('[MONGODB]: Connected to MongoDB'));
    }).catch((err) => {
        console.log(chalk.red('[MONGODB]: Error connecting to MongoDB'));
        console.log(err);
    });
})();