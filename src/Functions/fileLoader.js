const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);

async function loadFiles(dirName) {
    const files = await globPromise(`${process.cwd().replace(/\\/g, '/')}/${dirName}/**/*.js`);
    files.forEach((file) => delete require.cache[require.resolve(file)]);
    return files;
}

module.exports = { loadFiles };