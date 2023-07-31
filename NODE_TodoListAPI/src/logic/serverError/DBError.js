const ServerError = require('./serverError');
class DBError extends ServerError {
    constructor(message, operation, statusCode) {
        super(message, statusCode);
        this.name = this.constructor.name;
        this.operation = operation;
    }
}

module.exports = DBError;