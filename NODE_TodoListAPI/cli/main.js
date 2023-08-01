'use strict';

const api = require('./api');
const ask = require('./ask');
const log = require('./log');

main();
async function main() {
    console.log('\nWelcome to the Command Line Interface!\n');
    await cicle();
}

async function cicle() {
    try {
        const input = await ask.read();
        const response = await api.request(input);
        log.write(response);
    } catch (error) {
        return;
    }

    setTimeout(async () => {
        await cicle();
    }, 500);
}
