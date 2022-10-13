const { loadFiles } = require('../Functions/fileLoader');
const ascii = require('ascii-table');

async function loadCommands(client) {
    const table = new ascii('Commands');
    table.setHeading('Command', 'Status');

    await client.commands.clear();

    let commandArray = [];

    const files = await loadFiles('./src/Commands');
    files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        table.addRow(command.data.name, '✅');
    });

    client.application.commands.set(commandArray);

    return console.log(table.toString(), '\nCommands loaded!');
}

module.exports = { loadCommands };