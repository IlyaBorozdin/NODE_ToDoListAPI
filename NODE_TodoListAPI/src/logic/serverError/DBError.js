const ServerError = require('./serverError');
class DBError extends ServerError {
    constructor(message, operation, statusCode) {
        super(message, statusCode);
        this._operation = operation;
    }
    get operation() {
        return this._operation;
    }
    get errorResponse() {
        return Object.assign({}, super.errorResponse, {
            operation: this.operation
        });
    }
}

module.exports = DBError;