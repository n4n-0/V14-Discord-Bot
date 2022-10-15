const Guild = require('../../Schemas/guild.js');

const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
    name: 'guildDelete',
    once: false,

    async execute(guild) {
        console.log(chalk.red(`[BOT STATUS]: ${guild.name} has been removed from the bot`));
        const guildDB = await Guild.findOne({ guildID: guild.id });
        if(guildDB) {
            await Guild.deleteOne({ guildID: guild.id }).then(() => {
                console.log(chalk.red(`[BOT STATUS]: ${guild.name} has been removed from the database`));
            }).catch((err) => {
                console.log(chalk.red(`[BOT ERROR]: ${guild.name} has not been removed from the database`));
                console.log(err);
            });
        } else {
            console.log(chalk.red(`[BOT ERROR]: ${guild.name} has not been found in the database`));
        }
    }
}