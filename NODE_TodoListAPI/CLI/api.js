const cmd = require('./cmd');
class Api {
    constructor(port) {
        this._root = 'http://localhost:' + port;
    }

    request(input) {
        const { method, path, data } = cmd.parse(input);
        const url = this._root + path;
        const options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : undefined
        };

        return fetch(url, options)
            .catch(err => {
                console.error('Error in API request:\n', err);
            });
    }
}

module.exports = new Api(1337);