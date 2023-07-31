const ServerError = require('./serverError');
class ClientError extends ServerError {
    constructor(message, howToFix, statusCode) {
        super(message, statusCode || 400);
        this.name = this.constructor.name;
        this.howToFix = howToFix;
    }
}

module.exports = ClientError;