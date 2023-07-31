'use strict';

const readline = require('readline');
const api = require('./api');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

main();
async function main() {
    console.log('Welcome to the Command Line Interface!\n');
    await processCommand();
}
async function processCommand() {
    try {
        const command = await ask('Enter your command: ');

        if (command.trim() === 'exit') {
            console.log('Exiting...');
            rl.close();
            return;
        }

        const [method, url, body] = parseCommand(command);

        const res = await api(url, method, body);
        console.log(`Response:\n${JSON.stringify(res, null, 2)}\n`);

        await processCommand();
    } catch (err) {
        console.error('Something went wrong\n', err);
        await processCommand();
    }
}
function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}
function parseCommand(command) {
    const parts = command.trim().split(' ');
    const method = parts[0];
    const url = parts[1];
    const body = parts.length > 2 ? JSON.parse(parts.slice(2).join(' ')) : {};
    return [method, url, body];
}
