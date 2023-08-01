const readline = require('readline');

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Ask {
    constructor(cli) {
        this._cli = cli;
    }

    read() {
        return new Promise((resolve, reject) => {
            this._cli.question('Enter your command: ', input => {
                if (input.trim() === 'exit') {
                    console.log('Exiting...');
                    this._cli.close();
                    resolve();
                } else {
                    resolve(input);
                }
            });
        });
    }
}

module.exports = new Ask(cli);
