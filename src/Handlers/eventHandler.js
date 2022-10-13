const { loadFiles } = require('../Functions/fileLoader');
const ascii = require('ascii-table');

async function loadEvents(client) {
    const table = new ascii('Events');
    table.setHeading('Event', 'Status');

    await client.events.clear();

    const eventFiles = await loadFiles('src/Events');
    eventFiles.forEach((file) => {
        const event = require(file);
        const execute = (...args) => event.execute(client, ...args);
        client.events.set(event.name, execute);

        if(event.rest) {
            if(event.once) client.rest.once(event.name, execute);
            else
            client.rest.on(event.name, execute);
        } else {
            if(event.once) client.once(event.name, execute);
            else
            client.on(event.name, execute);
        }

        table.addRow(event.name, '✅');
    });

    return console.log(table.toString());
}

module.exports = { loadEvents };